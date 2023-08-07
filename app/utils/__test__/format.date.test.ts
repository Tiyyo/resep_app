import formatDate from "../format.date"

test("formatDate returns a date in the format DD, MMMM YYY ", () => {
    const newDate = new Date('08-07-2023')
    expect(formatDate(newDate)).toEqual('August 7, 2023')
})