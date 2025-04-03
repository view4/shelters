import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import Container from 'modules/Core/components/ui-kit/Container';
import { useMemo, useRef, useState } from 'react';
import Button from 'modules/Core/components/ui-kit/Button';
import Modal from 'modules/Core/components/ui-kit/Modal';
import Title from 'modules/Core/components/ui-kit/Title';
import Features from 'modules/Core/components/ui-kit/Features';
import Text from 'modules/Core/components/ui-kit/Text';
import ConditionalContainer from 'modules/Core/components/ui-kit/ConditionalContainer';
import ScheduleTimeForm from '../ScheduleTimeForm';
import strappedConnected from 'modules/Core/higher-order-components/strappedConnected';
import ScheduledTimeDetailsModal from '../ScheduledTimeDetailsModal';

// const _ScheduledTimeDetailsModal = ({ isOpen, onClose, entity }) => {
//     const [isEdit, setIsEdit] = useState(false);

//     return entity && (
//         <Modal isOpen={isOpen} onClose={onClose} >
//             <Container m1 p1 >
//                 <ConditionalContainer shouldRender={!isEdit} >
//                     <Features
//                         features={[
//                             {
//                                 content: <Title>{entity?.title}</Title>
//                             },
//                             {
//                                 content: <Text>{entity?.body}</Text>
//                             },
//                             {
//                                 content: <Title>{entity?.start?.toString()}</Title>
//                             },
//                             {
//                                 content: <Title>{entity?.end?.toString()}</Title>
//                             },
//                             {
//                                 content: (
//                                     <Container flex flexEnd>
//                                         <Button onClick={() => setIsEdit(!isEdit)}> {"Edit"}</Button>
//                                     </Container>
//                                 )
//                             }
//                         ]}
//                     />
//                 </ConditionalContainer>
//                 <ConditionalContainer shouldRender={isEdit} >
//                     <ScheduleTimeForm
//                         isOpen={true}
//                         close={() => setIsEdit(false)}
//                         initialState={{
//                             startDate: new Date(entity?.start),
//                             endDate: new Date(entity?.end),
//                             startTime: new Date(entity?.start),
//                             endTime: new Date(entity?.end),
//                             name: entity?.title,
//                             id: entity?.id,
//                             text: entity?.body,
//                         }}
//                         id={entity?.id}
//                         boothId={entity?.boothId}
//                     />
//                 </ConditionalContainer>

//             </Container>
//         </Modal>
//     )
// }

// const ScheduledTimeDetailsModal = strappedConnected(
//     _ScheduledTimeDetailsModal,
//     {
//         entity: (state, { id }) => feed
//     }
// )


const TimemapComponent = ({ entities, className, view = 'month', onSelectDates }) => {
    const [focusedEntity, setFocusedEntity] = useState(null);
    const ref = useRef(null)

    const parsedEntities = useMemo(() => {
        return entities.map(entity => ({
            ...entity,
            start: new Date(Number(entity.start)),
            end: new Date(Number(entity.end)),
            title: entity.name,
            calendarId: '1',
            id: entity.id,
            text: entity.text,
            body: entity.text
        }))
    }, [entities]);

    return (
        <Container className={className}>
            <Container>
                <Button onClick={() => ref?.current?.getInstance()?.prev?.()}> {"<"} </Button>
                <Button onClick={() => ref?.current?.getInstance()?.next?.()}> {">"} </Button>
            </Container>
            <Calendar
                ref={ref}
                height="100%"
                view={view}
                usageStatistics={false}
                useCreationPopup={false}
                useDetailPopup={false}
                taskView={false}
                selectable={true}
                scheduleView
                onSelectDateTime={(e) =>onSelectDates(new Date(e?.start), new Date(e?.end))}
                calendars={[
                    {
                        id: '1',
                        name: 'My Calendar',
                        color: '#ffffff',
                        bgColor: '#ffffff',
                        borderColor: '#ffffff'
                    }
                ]}
                week={{
                    taskView: false,
                    eventView: ['time'],
                }}
                events={parsedEntities}
                onClickEvent={(e) => setFocusedEntity(e.event)}
                onBeforeCreateEvent={(e) => {
                    console.log("onBeforeCreateEvent")
                    console.log(e)
                }}
                onDateClick={(e) => {
                    console.log("on date click")
                    console.log(e)
                }}
            />
            <ScheduledTimeDetailsModal
                isOpen={!!focusedEntity}
                onClose={() => setFocusedEntity(null)}
                id={focusedEntity?.id}
            />
        </Container>
    )
};

export default TimemapComponent;