'use client'
import { Card } from '@/components/ui/card'
import { useState } from 'react'
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'

interface AgendaProps {
  timeslots: string[] // Renamed from 'horarios' to 'timeslots'
  professionals: { name: string; photo: string }[] // Renamed from 'profissionais' to 'professionals'
  appointments: {
    // Renamed from 'agendamentos' to 'appointments'
    client: string
    professional: string
    serviceType: string // Renamed from 'tipoServico' to 'serviceType'
    startTime: string // Renamed from 'horaInicial' to 'startTime'
    endTime: string // Renamed from 'horaFinal' to 'endTime'
  }[]
}
export function Scheduler({
  timeslots,
  professionals,
  appointments,
}: AgendaProps) {
  const [agenda, setAgenda] = useState<{
    [key: string]: {
      client: string
      serviceType: string
      startTime: string
      endTime: string
    }[]
  }>(() => {
    const initialAgenda: {
      [key: string]: {
        client: string
        serviceType: string
        startTime: string
        endTime: string
      }[]
    } = {}
    appointments.forEach((appointment) => {
      const startTime = parseInt(appointment.startTime.split(':')[0])
      const endTime = parseInt(appointment.endTime.split(':')[0])
      for (let i = startTime; i < endTime; i++) {
        const timeslot = `${i.toString().padStart(2, '0')}:00`

        if (!initialAgenda[`${appointment.professional}-${timeslot}`]) {
          initialAgenda[`${appointment.professional}-${timeslot}`] = []
        }
        initialAgenda[`${appointment.professional}-${timeslot}`].push({
          client: appointment.client,
          serviceType: appointment.serviceType,
          startTime: appointment.startTime,
          endTime: appointment.endTime,
        })
      }
    })
    return initialAgenda
  })

  return (
    <div className="h-full overflow-hidden">
      <Card className="relative h-full">
        <Table className="w-full border overflow-x-auto">
          <TableHeader>
            <TableRow>
              <TableHead></TableHead>
              {professionals.map((professional, index) => (
                <TableHead key={index} className="px-3 border text-center ">
                  <div className=" flex items-center gap-3">
                    <img
                      src={professional.photo}
                      alt={professional.name}
                      className="w-9 h-9 rounded-full mb-2"
                    />
                    <span>{professional.name}</span>
                  </div>
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>

          <TableBody>
            {timeslots.map((timeslot, index) => (
              <TableRow
                key={index}
                style={{ border: 'none', borderRight: '1px solid #e5e7eb' }}
              >
                <td
                  className="relative py-1 text-center text-sm"
                  style={{ borderRight: '1px solid #e5e7eb' }}
                >
                  {timeslot}
                </td>
                {professionals.map((professional, index) => {
                  const professionalAppointment =
                    agenda[`${professional.name}-${timeslot}`]

                  if (
                    !professionalAppointment ||
                    professionalAppointment.length === 0
                  ) {
                    return <td key={index} className="relative" />
                  }

                  const occupiedTimeslots: { start: number; end: number }[] = []
                  let startTime = parseInt(
                    professionalAppointment[0].startTime.split(':')[0],
                  )
                  let endTime = parseInt(
                    professionalAppointment[0].endTime.split(':')[0],
                  )
                  for (let i = 1; i < professionalAppointment.length; i++) {
                    const current = parseInt(
                      professionalAppointment[i].startTime.split(':')[0],
                    )
                    if (current === endTime) {
                      endTime = parseInt(
                        professionalAppointment[i].endTime.split(':')[0],
                      )
                    } else {
                      occupiedTimeslots.push({ start: startTime, end: endTime })
                      startTime = current
                      endTime = parseInt(
                        professionalAppointment[i].endTime.split(':')[0],
                      )
                    }
                  }
                  occupiedTimeslots.push({ start: startTime, end: endTime })

                  return (
                    <TableCell key={index} className="relative">
                      {occupiedTimeslots.map((interval, idx) => (
                        <div
                          key={idx}
                          className=" ml-2 p-2 absolute "
                          style={{

                            top: 0,
                            width: '100%',
                            height: '100%',
                            margin: 0,
                            padding: 0,
                            overflow: 'hidden',
                            borderLeft: '4px solid #006BF9',
                          }}
                        >
                          <div className="text-center ">
                            {idx === 0 && (
                              <div>{professionalAppointment[0].client}</div>
                            )}
                            <div>{professionalAppointment[0].serviceType}</div>
                          </div>
                        </div>
                      ))}
                    </TableCell>
                  )
                })}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Card>
    </div>
  )
}