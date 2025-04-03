import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import Container from 'modules/Core/components/ui-kit/Container';
import { useMemo, useRef, useState } from 'react';
import Button from 'modules/Core/components/ui-kit/Button';
import ScheduledTimeDetailsModal from '../ScheduledTimeDetailsModal';

const calendars = [
    {
        id: '1',
        name: 'My Calendar',
        color: '#ffffff',
        bgColor: '#ffffff',
        borderColor: '#ffffff'
    }
]


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
                onSelectDateTime={(e) => onSelectDates(new Date(e?.start), new Date(e?.end))}
                calendars={calendars}
                week={{
                    taskView: false,
                    eventView: ['time'],
                }}
                events={parsedEntities}
                onClickEvent={(e) => setFocusedEntity(e.event)}
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