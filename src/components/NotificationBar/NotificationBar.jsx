import { BatteryCharging, Wifi } from 'lucide-react';
import Time from '../Time/Time';

export default function NotificationBar() {

  return (
    <div className='w-full flex justify-end absolute items-center top-0 left-0 text-white mt-4 z-[9]'>
      <Time className="mr-3" />
      <Wifi className='mr-3' />
      <BatteryCharging className='mr-3' />
    </div>
  )
}
