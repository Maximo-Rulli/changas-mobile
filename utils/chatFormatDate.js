function chatFormatDate (inputDate) {
    // Get offset from UTC
    const today = new Date()
    const offsetInHours = today.getTimezoneOffset() / 60

    // Get todays time with offset applied
    today.setHours(today.getHours() - offsetInHours)

    // Create a new Date object with the input data
    const date = new Date(inputDate)

    // Get local date (subtract offset)
    date.setHours(date.getHours() - offsetInHours)

    // If the date is today we just return the hours and minutes
    const dateCompare = (new Date(date.toISOString().slice(0,10))).toISOString()
    const todayCompare = (new Date(today.toISOString().slice(0,10))).toISOString()

    if (dateCompare === todayCompare){
        const formattedHours = date.getUTCHours().toString().padStart(2, '0')
        const formattedMinutes = date.getUTCMinutes().toString().padStart(2, '0')
        const formattedTime = `${formattedHours}:${formattedMinutes}`
    
        return formattedTime
    }

    // If the date is not today we return the date without hours
    else{
        // Get the day, month, and year from the Date object
        const formattedDay = date.getUTCDate().toString().padStart(2, '0')
        const formattedMonth = (date.getUTCMonth() + 1).toString().padStart(2, '0') // Adding 1 to month since it's 0-indexed
        const formattedYear = date.getUTCFullYear().toString().slice(2) // We just get the last two numbers of the current year
  
        // Concatenate the formatted parts into 'dd/mm/yyyy' format
        const formattedDate = `${formattedDay}/${formattedMonth}/${formattedYear}`
  
        return formattedDate
    } 
  }
  
export default chatFormatDate
  