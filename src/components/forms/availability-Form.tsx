"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { ArrowLeft, Trash } from "lucide-react";
import Link from "next/link";
import { updateAvailability } from "@/actions/updateAvailability";
import { times } from "@/lib/time";
import { Availability, dayAvailability } from "@/generated/prisma";

interface AvailabilityFormProps {
  availability: Availability & { dayavailabilities: dayAvailability[] };
}

export function AvailabilityForm({ availability }: AvailabilityFormProps) {
  const [activeMap, setActiveMap] = useState<Record<string, boolean>>(
    Object.fromEntries(availability.dayavailabilities.map((d) => [d.id, d.isActive]))
  );

  const toggleDay = (id: string) => {
    setActiveMap((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-x-2">
          <Link href="/availability">
            <ArrowLeft className="w-4 h-4 text-white cursor-pointer" />
          </Link>
          <h1 className="text-lg text-white font-bold">Availability</h1>
        </div>
        <div className="flex items-center gap-x-3">
          <Button size="icon">
            <Trash className="w-4 h-4" />
          </Button>
          <Button variant="outline" type="submit" form="availability-form" className="rounded-xl">
            Save
          </Button>
        </div>
      </div>

      <form id="availability-form" action={updateAvailability}>
        <Card className="w-[850px] mt-8 bg-[#0F0F0F] border-neutral-800">
          <CardContent className="flex flex-col gap-y-4 p-5">
            {availability.dayavailabilities.map((item) => (
              <div key={item.id} className="grid grid-cols-3 items-center gap-4">
                {/* Hidden inputs */}
                <input type="hidden" name={`id-${item.id}`} value={item.id} />
                <input type="hidden" name={`isActive-${item.id}`} value={activeMap[item.id] ? "on" : "off"} />

                <div className="flex items-center gap-x-3">
                  <Switch
                    checked={activeMap[item.id]}
                    onCheckedChange={() => toggleDay(item.id)}
                  />
                  <p className="text-[#B3B3B3]">{item.days}</p>
                </div>

                {activeMap[item.id] && (
                  <div className="flex gap-x-8">
                    <Select name={`fromTime-${item.id}`} defaultValue={item.fromTime}>
                      <SelectTrigger className="w-[150px] text-white border-neutral-700">
                        <SelectValue placeholder="From time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {times.map((time) => (
                            <SelectItem key={time.time} value={time.time}>
                              {time.time}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>

                    <Select name={`tillTime-${item.id}`} defaultValue={item.tillTime}>
                      <SelectTrigger className="w-[150px] text-white border-neutral-700">
                        <SelectValue placeholder="Till time" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          {times.map((time) => (
                            <SelectItem key={time.time} value={time.time}>
                              {time.time}
                            </SelectItem>
                          ))}
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </div>
                )}
              </div>
            ))}
          </CardContent>
        </Card>
      </form>
    </div>
  );
}
