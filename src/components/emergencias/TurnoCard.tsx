import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, User } from "lucide-react";

interface Shift {
  id: string;
  baseId: number;
  date: string;
  startTime: string;
  endTime: string;
  duration: number; // hours
  type: "FIJO" | "REEMPLAZO" | "EMERGENCIA";
  crew: {
    medico?: string;
    paramedico?: string;
    conductor?: string;
    enfermero?: string;
  };
  status: "PROGRAMADO" | "EN_CURSO" | "COMPLETADO" | "CANCELADO";
}

interface TurnoCardProps {
  shift: Shift;
  compact?: boolean;
  onClick?: () => void;
}

const TurnoCard = ({ shift, compact = false, onClick }: TurnoCardProps) => {
  const formatTime = (time: string) => {
    return time;
  };

  const getTypeBadge = (type: Shift["type"]) => {
    const variants = {
      FIJO: <Badge variant="default">Fijo</Badge>,
      REEMPLAZO: <Badge className="bg-orange-500 text-white">Reemplazo</Badge>,
      EMERGENCIA: <Badge className="bg-red-600 text-white">Emergencia</Badge>,
    };
    return variants[type];
  };

  const getStatusBadge = (status: Shift["status"]) => {
    const variants = {
      PROGRAMADO: <Badge variant="outline">Programado</Badge>,
      EN_CURSO: <Badge className="bg-blue-600 text-white">En Curso</Badge>,
      COMPLETADO: <Badge className="bg-green-600 text-white">Completado</Badge>,
      CANCELADO: <Badge variant="secondary">Cancelado</Badge>,
    };
    return variants[status];
  };

  if (compact) {
    return (
      <div
        className="flex items-center gap-2 p-2 rounded-lg bg-card border border-border hover:border-primary cursor-pointer transition-colors"
        onClick={onClick}
      >
        <div className="flex-1 min-w-0">
          <p className="text-xs font-medium truncate">
            {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
          </p>
          <div className="flex gap-1 mt-1">
            {Object.values(shift.crew).filter(Boolean).map((member, i) => (
              <Badge key={i} variant="secondary" className="text-xs px-1 py-0">
                {member}
              </Badge>
            ))}
          </div>
        </div>
        {getTypeBadge(shift.type)}
      </div>
    );
  }

  return (
    <Card
      className="hover:shadow-lg transition-shadow cursor-pointer"
      onClick={onClick}
    >
      <CardContent className="p-4">
        <div className="flex items-start justify-between mb-3">
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-muted-foreground" />
              <span className="font-medium">
                {formatTime(shift.startTime)} - {formatTime(shift.endTime)}
              </span>
              <span className="text-sm text-muted-foreground">
                ({shift.duration}h)
              </span>
            </div>
            <div className="flex gap-2">
              {getTypeBadge(shift.type)}
              {getStatusBadge(shift.status)}
            </div>
          </div>
        </div>

        <div className="space-y-2">
          {shift.crew.medico && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-red-600" />
              <span className="text-muted-foreground">Médico:</span>
              <span className="font-medium">{shift.crew.medico}</span>
            </div>
          )}
          {shift.crew.paramedico && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-blue-600" />
              <span className="text-muted-foreground">Paramédico:</span>
              <span className="font-medium">{shift.crew.paramedico}</span>
            </div>
          )}
          {shift.crew.conductor && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-green-600" />
              <span className="text-muted-foreground">Conductor:</span>
              <span className="font-medium">{shift.crew.conductor}</span>
            </div>
          )}
          {shift.crew.enfermero && (
            <div className="flex items-center gap-2 text-sm">
              <User className="h-4 w-4 text-purple-600" />
              <span className="text-muted-foreground">Enfermero:</span>
              <span className="font-medium">{shift.crew.enfermero}</span>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default TurnoCard;
