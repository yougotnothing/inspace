import { useEffect, type FC } from 'react';
import {
  EventColumn,
  EventWrapper,
  FieldHelperParagraph,
  ModalWrapper,
} from 'components/modals/event/Event-modal.styled';
import { useLazyQuery } from '@apollo/client';
import { GET_EVENT } from 'query/get-event';
import { Loader } from 'templates/Loader';
import { Header } from 'components/messages/Messages.styled';

export const SpottedModal: FC<{
  id: string | null;
  onClose: () => void;
  isOpen: boolean;
}> = ({ id, onClose, isOpen }) => {
  const [getEvent, { data, loading }] = useLazyQuery(GET_EVENT);

  useEffect(() => {
    if (id) getEvent({ variables: { id } });
  }, [id]);

  if (loading) return <Loader loading={loading} />;

  return (
    <ModalWrapper $isOpen={isOpen} onClick={onClose}>
      <EventWrapper>
        <EventColumn>
          <Header>{data?.getEventById?.description.split('-')[0]}</Header>
          {Object.entries(JSON.parse(data?.getEventById?.data || '{}')).map(
            ([key, value]) => (
              <FieldHelperParagraph
                key={key}
                $content=""
                $weight={600}
                $color="#fff"
              >
                {key}: {value as string}
              </FieldHelperParagraph>
            )
          )}
        </EventColumn>
      </EventWrapper>
    </ModalWrapper>
  );
};
