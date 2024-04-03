import Image from "next/image";
import { Scheduler } from "./_componet/Calendar";

const horariosFixos = [
  '07:00',
  '08:00',
  '09:00',
  '10:00',
  '11:00',
  '12:00',
  '13:00',
  '14:00',
  '15:00',
  '16:00',
  '17:00',
  '18:00',
  '19:00',
  '20:00',
  '21:00',
  '22:00',
]

const profissionais = [
  { name: 'Dr. Fulano', photo: 'https://source.unsplash.com/200x200/?doctor' },
  {
    name: 'Dra. Ciclana',
    photo: 'https://source.unsplash.com/200x200/?physician',
  },
  {
    name: 'Dra. Beltrano',
    photo: 'https://source.unsplash.com/200x200/?physician',
  },
]
const appointments = [
  {
    client: 'João',
    startTime: '07:00',
    endTime: '10:00',
    professional: 'Dr. Fulano',
    serviceType: 'Consulta',
  },
  {
    client: 'Maria',
    startTime: '09:00',
    endTime: '11:00',
    professional: 'Dra. Ciclana',
    serviceType: 'Exame',
  },
  {
    client: 'José',
    startTime: '10:00',
    endTime: '12:00',
    professional: 'Dr. Beltrano',
    serviceType: 'Consulta',
  },
]

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
       <div className="w-full h-80">
            <Scheduler
              timeslots={horariosFixos}
              professionals={profissionais}
              appointments={appointments}
            />
          </div>
         </main>
  );
}
