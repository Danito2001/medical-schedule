
const days = [
    {key: 'Mon', value: 'monday'},
    {key: 'Tue', value: 'tuesday'},
    {key: 'Wed', value: 'wednesday'},
    {key: 'Thu', value: 'thursday'},
    {key: 'Fri', value: 'friday'},
    {key: 'Sat', value: 'saturday'},
    {key: 'Sun', value: 'sunday'},
]

export const completeCalendarDays = (day: string) => {

    const matchDay = days.find( d => d.key === day)
    return matchDay?.value

}