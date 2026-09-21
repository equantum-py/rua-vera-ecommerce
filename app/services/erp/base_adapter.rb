module Erp
  class BaseAdapter
    def push_order(order)
      raise NotImplementedError, "Configure el adaptador del ERP antes de sincronizar pedidos."
    end

    def sync_inventory
      raise NotImplementedError, "Configure el adaptador del ERP antes de sincronizar inventario."
    end
  end
end
