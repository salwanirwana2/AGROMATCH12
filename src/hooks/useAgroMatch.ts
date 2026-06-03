import { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { showSuccess, showError } from '@/utils/toast';

export const useAgroMatch = (user: any) => {
  const [supplies, setSupplies] = useState<any[]>([]);
  const [orders, setOrders] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    setLoading(true);
    try {
      const { data: commoditiesData } = await supabase
        .from('commodities')
        .select('*')
        .order('created_at', { ascending: false });
      
      const { data: ordersData } = await supabase
        .from('orders')
        .select('*, order_items(*)')
        .order('created_at', { ascending: false });

      if (commoditiesData) setSupplies(commoditiesData);
      if (ordersData) setOrders(ordersData);
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Real-time subscriptions
    const commoditiesChannel = supabase
      .channel('commodities-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'commodities' }, () => fetchData())
      .subscribe();

    const ordersChannel = supabase
      .channel('orders-changes')
      .on('postgres_changes', { event: '*', schema: 'public', table: 'orders' }, () => fetchData())
      .subscribe();

    return () => {
      supabase.removeChannel(commoditiesChannel);
      supabase.removeChannel(ordersChannel);
    };
  }, []);

  const addSupply = async (newSupply: any) => {
    const { error } = await supabase.from('commodities').insert([{
      ...newSupply,
      user_id: user?.id,
      cooperative_name: user?.name || "Koperasi Tani"
    }]);

    if (error) {
      showError("Gagal mengunggah komoditas");
      throw error;
    }
    showSuccess("Komoditas berhasil diunggah!");
  };

  const createOrder = async (orderData: any) => {
    const { data: order, error: orderError } = await supabase
      .from('orders')
      .insert([{
        buyer_id: user?.id,
        receiver_name: orderData.buyerName,
        phone_number: orderData.buyerPhone,
        shipping_address: orderData.address,
        region: orderData.region,
        total_payment: orderData.totalPrice,
        status: 'PENDING_MATCHMAKING'
      }])
      .select()
      .single();

    if (orderError) {
      showError("Gagal membuat pesanan");
      throw orderError;
    }

    const items = orderData.items.map((item: any) => ({
      order_id: order.id,
      commodity_name: item.commodity,
      quantity_kg: item.qty,
      price_at_purchase: item.price
    }));

    const { error: itemsError } = await supabase.from('order_items').insert(items);
    
    if (itemsError) {
      showError("Gagal menyimpan item pesanan");
      throw itemsError;
    }

    showSuccess("Pesanan berhasil dibuat!");
  };

  const approveOrder = async (orderId: string) => {
    const { error } = await supabase
      .from('orders')
      .update({ status: 'MATCHED_READY_FOR_SHIPPING' })
      .eq('id', orderId);

    if (error) {
      showError("Gagal menyetujui pesanan");
      throw error;
    }
    showSuccess("Pesanan disetujui!");
  };

  return {
    supplies,
    orders,
    loading,
    addSupply,
    createOrder,
    approveOrder,
    refresh: fetchData
  };
};