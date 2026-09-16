import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { ShippingForm, CheckoutStore } from '@/types';

const defaultShipping: ShippingForm = {
  full_name: '',
  email: '',
  phone: '',
  document: '',
  ruc: '',
  invoice_name: '',
  address: '',
  city: '',
  neighborhood: '',
  reference: '',
  country: 'Paraguay',
  delivery_method: 'delivery',
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      shipping: defaultShipping,
      orderId: null,
      setShipping: (shipping) => set({ shipping }),
      setOrderId: (orderId) => set({ orderId }),
      reset: () => set({ shipping: defaultShipping, orderId: null }),
    }),
    { name: 'rua-vera-checkout' }
  )
)
