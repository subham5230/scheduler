import React from 'react'
import moment from 'moment';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import axios from 'axios'
import Loading from './Loading';
import Toast from './Toast';
import { validateEmail } from '../functions/Modal';

const Event = React.forwardRef(({toggleModal}, ref) => {

  const eventTemplate = {
    email: '',
    summary: '',
    description: '',
    date: '',
    startTime: '',
    endTime: '',
    timezoneOffset: ''
  }

  const [dates, setDates] = React.useState([])
  const [slots, setSlots] = React.useState([])
  const [value, setValue] = React.useState(new Date());
  const [event, setEvent] = React.useState(eventTemplate)
  const [email, setEmail] = React.useState('')
  const [name, setName] = React.useState('')
  const [meetingTitle, setMeetingTitle] = React.useState('<YOUR NAME> <> Subham Mohanty')
  const [meetingDescription, setMeetingDescription] = React.useState('')
  const [loading, setLoading] = React.useState(false)
  const [slotLoading, setSlotLoading] = React.useState(false)
  const [eventStage, setEventStage] = React.useState(0)
  const [toastMessage, setToastMessage] = React.useState('')
  React.useEffect(()=>{
    name.length>0? setMeetingTitle(`${name} <> Subham Mohanty`) : setMeetingTitle('<YOUR NAME> <> Subham Mohanty')
  }, [name])

  React.useImperativeHandle(ref, () => ({

    flushData() {
      setDates([])
      setSlots([])
      setEvent(eventTemplate)
      setEventStage(0)
      setMeetingDescription('')
      setMeetingTitle('')
      setLoading(false)
      setSlotLoading(false)
    },

    fetchDatesWrapper(){
      setMeetingDescription(`30 Minutes Meeting`)
      fetchDates()
    }, 

    initiateLoading(){
      setLoading(true)
    },

    finishLoading(){
      setLoading(false)
    }

  }))

  function fetchSlots(nextValue) {
    // console.log(nextValue)
    setSlotLoading(true)
    const targetDate = moment(nextValue).format('DDMMYYYY')

    // console.log(targetDate)
    axios.post(`${process.env.SERVER_URI}/schedule/meet/slots`, {
      date: targetDate
    })
    .then((response) => {

      const eventbody = event

      eventbody.date = String(moment(nextValue).format('YYYY-MM-DD'))
      // console.log(eventbody.date)

      setEvent(eventbody)

      // console.log(response.data.slots)
      const slots = []

      response.data.slots?.forEach(slot => {
        const timeSlot = `${eventbody.date} ${slot.start}`
        if(moment.utc(timeSlot, 'YYYY-MM-DD HH:mm').isAfter(moment())){
          slots.push(slot)
        }
      })

      setSlots(slots)
      setSlotLoading(false)
    })
    .catch((error) => {
      // console.log(error)
      setSlotLoading(false)
      return null
    })


    // setValue(nextValue);
  }

  function fetchDates(){
    axios.get(`${process.env.SERVER_URI}/schedule`)
    .then((response) => {
      // console.log(response.data.dates)
      setDates(response.data.dates)
      setLoading(false)
    })
    .catch((error) => {
      // console.log(error)
      return null
    })
  }

  async function createEvent(){

    if(email.length < 1 || name.length < 1){
      setToastMessage("Please enter all the details")
      return
    }
    if(!validateEmail(email)){
      setToastMessage("Please enter a valid email")
      return
    
    }

    const currentEvent = event
    currentEvent.email = email
    currentEvent.summary = meetingTitle
    currentEvent.description = meetingDescription
    // console.log(currentEvent)

    setLoading(true)

    axios.post(`${process.env.SERVER_URI}/meet/create`, currentEvent)
    .then((response) => {

      // console.log(response.data)
      setEventStage(2)
      setLoading(false)

      setTimeout(() => {
        toggleModal()
        setDates([])
        setSlots([])
        setEvent(eventTemplate)
        setEventStage(0)
        setMeetingDescription('')
        setMeetingTitle('')
        setEmail('')    
        setName('')
      }, 3000);
      
      
    })
    .catch((error) => {
      // console.log(error)
      setEventStage(3)
      setLoading(false)
      
      setTimeout(() => {
        toggleModal()
        fetchUpcomingEvents()
        setDates([])
        setSlots([])
        setEvent(eventTemplate)
        setEventStage(0)
        setMeetingDescription('')
        setMeetingTitle('')    
        setEmail('')    
        setName('')
      }, 3000);
    })

  }

  function handleEventStageZero(slot){

    // console.log(slot)

    const eventbody = event

    eventbody.email = email
    eventbody.startTime = slot.start + ':00'
    eventbody.endTime = slot.end + ':00'
    eventbody.timezoneOffset = moment().format('Z')

    // console.log(eventbody)

    setEvent(eventbody)


    setEventStage(1)
  }

  const EventStageZeroComponent = () => {
    return (
      <div className='flex h-[80%] w-[95%] items-end justify-center'>
       <div className='h-full w-[70%] flex flex-col justify-center items-center'>
              <div className='w-[90%] h-[15%] flex items-center text-3xl font-proximaRegular tracking-wide'><span className='text-4xl font-semibold'>{dates.availableTime?.duration}&nbsp;</span> minutes meeting</div>
              {/* <div className='w-[90%] h-[15%] flex items-center text-3xl font-semibold font-proximaRegular tracking-wider'>30 minutes meeting</div> */}
              <div className='w-[90%] h-[85%] flex justify-center items-center'>
              <Calendar
                onChange={fetchSlots}
                value={value}
                
                calendarType='US'
                tileDisabled={({ date }) => dates.excludeDays?.includes(date.getDay())}
                minDate={new Date()}
                maxDate={new Date(moment(dates.availableTime?.end, 'MM-DD-YYYY').format('YYYY-MM-DD'))}
                />
              </div>
        </div>

        <div className='h-[90%] w-[30%] overflow-y-auto'>
          {
            slotLoading? <Loading type='bubbles' color='#6151c9' /> 
            :
            event.date.length>0 && slots.length>0 ?


            (
              slots?.map((slot)=>

              {
                // const tz = (new Date).getTimezoneOffset()
                const timeString12hr = new Date('1970-01-01T' + slot.start + ':00Z')
                                            .toLocaleTimeString('en-US',
                                              {hour12:true,hour:'numeric',minute:'numeric'}
                                            );

                return(
                  <button onClick={()=>{handleEventStageZero(slot)}} key={slots.indexOf(slot)} className='bg-[#604ea3] hover:bg-[#393072] font-proximaRegular text-white h-[15%] w-[90%] flex items-center justify-center my-4'>{timeString12hr}</button>
                )
              
              })
            )

            :

            (
              event.date.length>0 ?

              (
                <div className='w-full h-full flex justify-center items-center font-proximaRegular text-gray-300'>
                  No slots available for this date
                </div>
              )
              :
              (
                <div className='w-full h-full flex justify-center items-center font-proximaRegular text-gray-300'>
                  Please select a date
                </div>
              )
            )
          }
        </div>
    
    </div>
    )
  }

  const EventStageOneComponent = () => {

    return(
      <div className='w-[85%] h-[85%] flex flex-col justify-around items-center'>
        <div className='text-white text-3xl w-full h-[10%] font-proximaRegular flex tracking-wider'>Confirm Meeting</div>
        <div className='w-full h-[75%] flex flex-col justify-start overflow-y-auto'>
          <div className='w-[90%] h-[10%] flex justify-around my-4'>
            <div className='w-[30%] h-full font-proximaRegular flex items-center tracking-wider text-gray-50'>Your Email:</div>
            <input value={email} placeholder="Enter your email" className='border border-gray-400 w-[60%] h-full bg-transparent font-proximaRegular px-4'
              onChange={(e)=> {
                setEmail(e.target.value)
              }}
            ></input>
          </div>
          <div className='w-[90%] h-[10%] flex justify-around my-4'>
            <div className='w-[30%] h-full font-proximaRegular flex items-center tracking-wider text-gray-50'>Your Name:</div>
            <input value={name} placeholder='Enter your name' className='border border-gray-400 w-[60%] h-full bg-transparent font-proximaRegular px-4'
              onChange={(e)=> {
                setName(e.target.value)
              }}
            ></input>
          </div>
          <div className='w-[90%] h-[10%] flex justify-around my-4'>
            <div className='w-[30%] h-full font-proximaRegular flex items-center tracking-wider text-gray-50'>Meeting Title:</div>
            <div className='w-[60%] h-full bg-transparent font-proximaRegular flex items-center text-gray-400'>{meetingTitle}</div>
          </div>
          <div className='w-[90%] h-[10%] flex justify-around my-4'>
            <div className='w-[30%] h-full font-proximaRegular flex items-center tracking-wider text-gray-50'>Start:</div>
            <div className='w-[60%] h-full bg-transparent font-proximaRegular flex items-center text-gray-400'>{`${moment(event.date, 'YYYY-MM-DD').format('DD MMMM YYYY')} ${new Date('1970-01-01T' + event.startTime + 'Z')
                                          .toLocaleTimeString('en-US',
                                            {hour12:true,hour:'numeric',minute:'numeric'}
                                          )}`}</div>
          </div>
          <div className='w-[90%] h-[10%] flex justify-around my-4'>
            <div className='w-[30%] h-full font-proximaRegular flex items-center tracking-wider text-gray-50'>End:</div>
            <div className='w-[60%] h-full bg-transparent font-proximaRegular flex items-center text-gray-400'>{`${moment(event.date, 'YYYY-MM-DD').format('DD MMMM YYYY')} ${new Date('1970-01-01T' + event.endTime + 'Z')
                                          .toLocaleTimeString('en-US',
                                            {hour12:true,hour:'numeric',minute:'numeric'}
                                          )}`}</div>
          </div>
        </div>
        <div className='w-full h-[10%] flex justify-end'>
          <button onClick={createEvent} className='bg-[#7130db] font-proximaRegular h-full w-[20%] text-xl'>Confirm</button>
        </div>
      </div>
    )
  }

  const EventCreateSuccessfulComponent = () => {
    return(
      <div className='w-[85%] h-[85%] flex flex-col justify-center items-center'>
        <div className=' w-[80%] h-[20%] text-6xl flex justify-center items-center text-[#02d371] font-proximaRegular'>Success</div>
        <div className='text-center font-proximaRegular w-[80%] h-[20%] text-xl flex justify-center items-center'>Your slot has been booked successfully. Please check your email or google calendar for an invite. See you soon!</div>
      </div>
    )
  }

  const EventCreateFailureComponent = () => {
    return(
      <div className='w-[85%] h-[85%] flex flex-col justify-center items-center'>
        <div className='w-[80%] h-[20%] text-6xl flex justify-center items-center text-[#bb004e] font-proximaRegular'>Oops...</div>
        <div className='text-center font-proximaRegular w-[90%] h-[20%] text-xl flex justify-center items-center'>Something went wrong while processing your request for this slot, Please try again later.</div>
      </div>
    )
  }

  function renderView () {
    if(eventStage === 0)
      return EventStageZeroComponent()
    else if(eventStage === 1)
      return EventStageOneComponent()
    else if(eventStage === 2)
      return EventCreateSuccessfulComponent()
    else if(eventStage === 3)
      return EventCreateFailureComponent()
  }

  return (
    <>
    {
      loading? <Loading type='spinningBubbles' color='#6151c9' /> : renderView()
    }
    <Toast message={toastMessage} setMessage={setToastMessage} />
    </>
  )
})

Event.displayName = 'Event';

export default Event