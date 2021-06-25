import dayjs from '@/utils/date'
import type { BaseEventOrig } from '@tarojs/components'
import { Picker } from '@tarojs/components'
import type { PickerDateProps, PickerMultiSelectorProps } from '@tarojs/components/types/Picker'
import React, { useEffect, useState } from 'react'

type DatetimeArray = [number, number, number, number, number]

function getYears(
  [year]: DatetimeArray,
  start: dayjs.Dayjs | undefined,
  end: dayjs.Dayjs | undefined
) {
  const _start = start?.get('year') ?? year - 5
  const _end = end?.get('year') ?? year + 5
  const ret = []
  for (let i = _start; i <= _end; i++) {
    ret.push(i)
  }
  return ret
}

function getMonthes(
  [year]: DatetimeArray,
  start: dayjs.Dayjs | undefined,
  end: dayjs.Dayjs | undefined
) {
  const _start = start && start.get('year') === year ? start.get('month') + 1 : 1
  const _end = end && end.get('year') === year ? end.get('month') + 1 : 12
  const monthes = []
  for (let month = _start; month <= _end; month++) {
    monthes.push(month)
  }
  // console.log('monthes', _start, _end, monthes)
  return monthes
}

function getDays(
  [year, month]: DatetimeArray,
  start: dayjs.Dayjs | undefined,
  end: dayjs.Dayjs | undefined
) {
  const _start =
    start && start.get('year') === year && start.get('month') + 1 === month ? start.get('date') : 1
  const _end =
    end && end.get('year') === year && end.get('month') + 1 === month
      ? end.get('date')
      : dayjs(`${year}-${month}-01`).endOf('month').get('date')
  const ret = []
  for (let i = _start; i <= _end; i++) {
    ret.push(i)
  }
  return ret
}

function getHours(
  [year, month, day]: DatetimeArray,
  start: dayjs.Dayjs | undefined,
  end: dayjs.Dayjs | undefined
) {
  const _start =
    start &&
    start.get('year') === year &&
    start.get('month') + 1 === month &&
    start.get('date') === day
      ? start.get('hour')
      : 0
  const _end =
    end && end.get('year') === year && end.get('month') + 1 === month && end.get('date') === day
      ? end.get('hour')
      : 23
  const ret = []
  for (let i = _start; i <= _end; i++) {
    ret.push(i)
  }
  return ret
}

function getMinutes(
  [year, month, day, hour]: DatetimeArray,
  start: dayjs.Dayjs | undefined,
  end: dayjs.Dayjs | undefined
) {
  const _start =
    start &&
    start.get('year') === year &&
    start.get('month') + 1 === month &&
    start.get('date') === day &&
    start.get('hour') === hour
      ? start.get('minute')
      : 0
  const _end =
    end &&
    end.get('year') === year &&
    end.get('month') + 1 === month &&
    end.get('date') === day &&
    end.get('hour') === hour
      ? end.get('minute')
      : 59
  const ret = []
  for (let i = _start; i <= _end; i++) {
    ret.push(i)
  }
  return ret
}

const nowDay = dayjs()
const now = [
  nowDay.get('year'),
  nowDay.get('month') + 1,
  nowDay.get('date'),
  nowDay.get('hour'),
  nowDay.get('minute')
]

interface DatetimeProps extends Omit<PickerDateProps, 'mode' | 'onChange' | 'onColumnChange'> {
  onChange?: (v: string) => void
}

const Datetime: React.FC<DatetimeProps> = ({ value, start, end, onChange, ...props }) => {
  const [datetime, setDatetime] = useState<DatetimeArray>([...now] as DatetimeArray)

  const startDay = start ? dayjs(start) : undefined
  const endDay = end ? dayjs(end) : undefined

  const years = getYears(datetime, startDay, endDay)
  const monthes = getMonthes(datetime, startDay, endDay)
  const days = getDays(datetime, startDay, endDay)
  const hours = getHours(datetime, startDay, endDay)
  const minutes = getMinutes(datetime, startDay, endDay)

  const indexValue = [
    years.indexOf(datetime[0]),
    monthes.indexOf(datetime[1]),
    days.indexOf(datetime[2]),
    hours.indexOf(datetime[3]),
    minutes.indexOf(datetime[4])
  ]
  // console.log('indexValue', ...indexValue)

  const onColumnChange = ({
    detail
  }: BaseEventOrig<PickerMultiSelectorProps.ColumnChangeEvnetDetail>) => {
    const allValues = [years, monthes, days, hours, minutes]
    const column = detail.column
    const _value = allValues[column][detail.value]
    const clone = datetime.slice()
    clone.splice(column, 1, _value)
    setDatetime(clone as DatetimeArray)
    // console.log('onColumnChange', detail, clone)
  }

  const onDatetimeChange = ({
    detail
  }: BaseEventOrig<PickerMultiSelectorProps.ChangeEventDetail>) => {
    const _year = years[detail.value[0]]
    const _month = monthes[detail.value[1]]
    const _day = days[detail.value[2]]
    const _hour = hours[detail.value[3]]
    const _minute = minutes[detail.value[4]]
    // debugger
    onChange?.(dayjs(`${_year}-${_month}-${_day} ${_hour}:${_minute}`).format('YYYY-MM-DD HH:mm'))
  }

  useEffect(() => {
    if (value) {
      const _datetime = dayjs(value)
      setDatetime([
        _datetime.get('year'),
        _datetime.get('month') + 1,
        _datetime.get('date'),
        _datetime.get('hour'),
        _datetime.get('minute')
      ])
    }
  }, [value])

  return (
    <Picker
      mode="multiSelector"
      range={[
        years.map(i => `${i}年`),
        monthes.map(i => `${i}月`),
        days.map(i => `${i}日`),
        hours.map(i => `${i}时`),
        minutes.map(i => `${i}分`)
      ]}
      value={indexValue}
      onChange={onDatetimeChange}
      onColumnChange={onColumnChange}
      {...props}
    >
      {props.children}
    </Picker>
  )
}

export default Datetime
