import { Dispatch, FC, SetStateAction } from 'react';
import { NearestBodies } from 'types/nearest-bodies';
import {
  EventColumn,
  EventWrapper,
  FieldHelperParagraph,
  ModalWrapper,
} from './Event-modal.styled';
import { Header } from 'components/moon-phase/Moon-phase.styled';
import { Paragraph } from 'styles/Paragraph';
import { Button } from 'styles/Button';
import { CREATE_EVENT } from 'mutation/event';
import { useMutation } from '@apollo/client';
import { useSelf } from 'hooks/use-self';
import { SEND_EVENT_EMAIL } from 'mutation/email';
import { MoonLoader } from 'react-spinners';

interface CreateEventProps {
  type: string;
  date: string;
  data: string;
  description: string;
}

export const EventModal: FC<{
  event: NearestBodies | undefined;
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}> = ({ event, isOpen, setIsOpen }) => {
  const [createEvent] = useMutation(CREATE_EVENT);
  const { data: user } = useSelf();
  const [sendEventEmail, { data, loading, error }] =
    useMutation(SEND_EVENT_EMAIL);

  const handleCreateEvent = async (data: CreateEventProps) => {
    try {
      await createEvent({
        variables: {
          event: {
            type: 'ASTEROID',
            date: data.date,
            data: JSON.stringify(event),
            description: data.description,
            userId: user?.getSelf?.id,
          },
        },
      }).then(
        async r =>
          await sendEventEmail({
            variables: {
              email: user?.getSelf?.email,
              eventId: r?.data?.createEvent?.id,
            },
          })
      );
    } catch (error: any) {
      console.error(error);
    }
  };
  const handleCloseModal = () => setIsOpen(false);

  return (
    <ModalWrapper $isOpen={isOpen} onClick={handleCloseModal}>
      <EventWrapper onClick={e => e.stopPropagation()}>
        {event ? (
          <>
            <EventColumn>
              <Header>{event.des}</Header>
              <br />
              <Paragraph>
                fullname: <strong>{event.fullname}</strong>
              </Paragraph>
              <Paragraph>{event.cd}</Paragraph>
              <FieldHelperParagraph $content="time of close-approach (JD Ephemeris Time, TDB)">
                jd time: {event.jd}
              </FieldHelperParagraph>
              <FieldHelperParagraph $content="3-sigma uncertainty in the time of close-approach">
                time uncertainty: {event.t_sigma_f.replace('_', ' days ')}
              </FieldHelperParagraph>
              <Button
                disabled={loading}
                style={{ marginTop: 'auto' }}
                onClick={() =>
                  handleCreateEvent({
                    type: 'ASTEROID',
                    date: event.cd,
                    data: JSON.stringify(event),
                    description: `${event.des} ${event.cd}`,
                  })
                }
              >
                {loading ? <MoonLoader size={'1rem'} /> : 'spot event'}
              </Button>
            </EventColumn>
            <EventColumn>
              <Paragraph>
                distance: {event.dist}{' '}
                {localStorage.getItem('shown_distance')?.toLowerCase()}
              </Paragraph>
              <Paragraph>
                min: {event.dist_min}{' '}
                {localStorage.getItem('shown_distance')?.toLowerCase()}
              </Paragraph>
              <Paragraph>
                max: {event.dist_max}{' '}
                {localStorage.getItem('shown_distance')?.toLowerCase()}
              </Paragraph>
              <br />
              <FieldHelperParagraph $content="absolute magnitude H (mag)">
                h: {event.h}mag
              </FieldHelperParagraph>
              <FieldHelperParagraph $content="velocity relative to a massless body (km/s)">
                v inf: {event.v_inf} km/s
              </FieldHelperParagraph>
              <FieldHelperParagraph $content="velocity relative to the approach body at close approach (km/s)">
                v rel: {event.v_rel} km/s
              </FieldHelperParagraph>
              <FieldHelperParagraph $content="orbit ID used for the close-approach computation">
                orbit id: {event.orbit_id}
              </FieldHelperParagraph>
              <FieldHelperParagraph $content="diameter of the body (km)">
                diameter: {event.diameter ?? 'unknown'}
              </FieldHelperParagraph>
              <FieldHelperParagraph $content="1-sigma uncertainty in the diameter of the body (km)">
                diameter (sigma): {event.diameter_sigma ?? 'unknown'}
              </FieldHelperParagraph>
            </EventColumn>
          </>
        ) : (
          <Header>event is not defined</Header>
        )}
      </EventWrapper>
    </ModalWrapper>
  );
};
