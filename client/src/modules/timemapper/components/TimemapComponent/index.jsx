import Calendar from '@toast-ui/react-calendar';
import '@toast-ui/calendar/dist/toastui-calendar.min.css';
import Container from 'modules/Core/components/ui-kit/Container';
import { useMemo } from 'react';

const TimemapComponent = ({ entities, className, view = 'month' }) => {

    const parsedEntities = useMemo(() => {
        return entities.map(entity => ({
            ...entity,
            start: new Date(entity.start),
            end: new Date(entity.end),
            title: entity.name,
            calendarId: '1',
            id: entity.id,
            text: entity.text,
        }))
    }, [entities]);

    return (
        <Container className={className}>
            <Calendar
                height="100%"
                view={view}
                usageStatistics={false}
                useCreationPopup={false}
                useDetailPopup={true}
                taskView={false}
                scheduleView={['time']}
                calendars={[
                    {
                        id: '1',
                        name: 'My Calendar',
                        color: '#ffffff',
                        bgColor: '#ffffff',
                        borderColor: '#ffffff'
                    }
                ]}
                schedules={parsedEntities}
            />
        </Container>
    )
};

export default TimemapComponent;