module Payments
  class BaseGateway
    def create_payment(order:, return_url:)
      raise NotImplementedError, "Configure la pasarela de pago antes de cobrar."
    end
  end
end
