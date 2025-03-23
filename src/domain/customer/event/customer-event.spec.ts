import EventDispatcher from "../../@shared/event/event-dispatcher";
import Customer from "../entity/customer";
import Address from "../value-object/address";
import CustomerAddressChangedEvent from "./customer-address-changed.event";
import CustomerCreatedEvent from "./customer-created.event";
import EnviaConsoleLogWhenCustomerAddressIsChangedHandler from "./handler/envia-console-log-when-customer-address-is-changed.handler";
import EnviaConsoleLogWhenCustomerIsCreatedHandler1 from "./handler/envia-console-log-when-customer-is-created-1.handler";
import EnviaConsoleLogWhenCustomerIsCreatedHandler2 from "./handler/envia-console-log-when-customer-is-created-2.handler";

describe("Customer aggregate event tests", () => {
  it("should register and dispatch CustomerCreatedEvent handlers", () => {
    const customer = new Customer("123", "Customer 1");

    const eventDispatcher = new EventDispatcher();
    const eventHandler1 = new EnviaConsoleLogWhenCustomerIsCreatedHandler1();
    const eventHandler2 = new EnviaConsoleLogWhenCustomerIsCreatedHandler2();

    eventDispatcher.register("CustomerCreatedEvent", eventHandler1);
    eventDispatcher.register("CustomerCreatedEvent", eventHandler2);

    const spyEventHandler1 = jest.spyOn(eventHandler1, "handle");
    const spyEventHandler2 = jest.spyOn(eventHandler2, "handle");

    expect(
      eventDispatcher.getEventHandlers["CustomerCreatedEvent"]
    ).toStrictEqual([eventHandler1, eventHandler2]);

    const customerCreatedEvent = new CustomerCreatedEvent({ customer });

    eventDispatcher.notify(customerCreatedEvent);

    expect(spyEventHandler1).toHaveBeenCalled();
    expect(spyEventHandler2).toHaveBeenCalled();
  });

  it("should register and dispatch CustomerAddressChangedEvent handlers", () => {
    const customer = new Customer("123", "Customer 1");
    const address = new Address("Street 1", 1, "Zip 1", "City 1");
    customer.changeAddress(address);

    const eventDispatcher = new EventDispatcher();
    const eventHandler =
      new EnviaConsoleLogWhenCustomerAddressIsChangedHandler();

    eventDispatcher.register("CustomerAddressChangedEvent", eventHandler);

    const spyEventHandler = jest.spyOn(eventHandler, "handle");

    expect(
      eventDispatcher.getEventHandlers["CustomerAddressChangedEvent"]
    ).toStrictEqual([eventHandler]);

    const customerAddressChangedEvent = new CustomerAddressChangedEvent({
      customer,
    });

    eventDispatcher.notify(customerAddressChangedEvent);

    expect(spyEventHandler).toHaveBeenCalled();
  });
});
