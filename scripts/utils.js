import dayjs from 'dayjs'

export const formatTime = (date, formater = 'YYYY-MM-DD HH:mm:ss') => dayjs(date).format(formater)
