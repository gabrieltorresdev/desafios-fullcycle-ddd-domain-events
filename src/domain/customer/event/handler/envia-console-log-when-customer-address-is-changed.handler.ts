import EventHandlerInterface from "../../../@shared/event/event-handler.interface";
import CustomerAddressChangedEvent from "../customer-address-changed.event";

export default class EnviaConsoleLogWhenCustomerAddressIsChangedHandler
  implements EventHandlerInterface<CustomerAddressChangedEvent>
{
  handle({ eventData: { customer } }: CustomerAddressChangedEvent): void {
    const addressString = `${customer.Address.street} - ${customer.Address.number} - ${customer.Address.city} (${customer.Address.zip})`;
    console.log(
      `Endereço do cliente: ${customer.id}, ${customer.name} alterado para: ${addressString}`
    );
  }
}
