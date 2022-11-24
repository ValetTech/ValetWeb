import { Input, Switch, TextInput } from '@mantine/core';
import { IconAt, IconPhone, IconUser } from '@tabler/icons';
import InputMask from 'react-input-mask';
import Reservation from '../../Models/Reservation';

function CreateCustomerForm({
  reservationDetails,
  setReservationDetails,
  className,
}: {
  reservationDetails: Reservation;
  setReservationDetails: (reservation: Reservation) => void;
  className?: string;
}) {
  const phoneRegex = /^[+]?[(]?[0-9]{3}[)]?[-s.]?[0-9]{3}[-s.]?[0-9]{4,6}$/;

  return (
    <div className={`w-full flex flex-col flex-grow space-y-2 ${className}`}>
      <div className=" w-full  flex flex-row space-x-2">
        <TextInput
          label="First Name"
          icon={<IconUser />}
          placeholder="First Name"
          value={reservationDetails?.customer?.firstName?.toString() ?? ''}
          onChange={(event) =>
            setReservationDetails({
              ...reservationDetails,
              customer: {
                ...reservationDetails.customer,
                firstName: event.currentTarget.value,
              },
            })
          }
        />
        <TextInput
          label="Last Name"
          icon={<IconUser />}
          withAsterisk
          required
          placeholder="Last Name"
          value={reservationDetails?.customer?.lastName?.toString() ?? ''}
          onChange={(event) =>
            setReservationDetails({
              ...reservationDetails,
              customer: {
                ...reservationDetails.customer,
                lastName: event.currentTarget.value,
              },
            })
          }
        />
      </div>
      <div className=" w-full flex flex-row  flex-grow space-x-2">
        <Input.Wrapper label="Phone number" required>
          <Input
            component={InputMask}
            icon={<IconPhone />}
            mask="+(99) 999 999 999"
            placeholder="Your phone number"
            value={reservationDetails.customer?.phone}
            onChange={(event) =>
              setReservationDetails({
                ...reservationDetails,
                customer: {
                  ...reservationDetails.customer,
                  phone: event.currentTarget.value,
                },
              })
            }
          />
        </Input.Wrapper>
        <TextInput
          label="Email"
          icon={<IconAt />}
          placeholder="Your email"
          value={reservationDetails.customer?.email}
          onChange={(event) =>
            setReservationDetails({
              ...reservationDetails,
              customer: {
                ...reservationDetails.customer,
                email: event.currentTarget.value,
              },
            })
          }
        />
      </div>
      <div className=" w-full ">
        <Switch
          label={reservationDetails.customer?.isVip ? 'VIP' : 'Not VIP'}
          checked={reservationDetails.customer?.isVip?.toString() === 'true'}
          onChange={(value) =>
            setReservationDetails({
              ...reservationDetails,
              customer: {
                ...reservationDetails.customer,
                isVip: value.currentTarget.checked,
              },
            })
          }
        />
      </div>
    </div>
  );
}
