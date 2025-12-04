import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { User, Phone, Mail, Calendar, Edit, Trash2 } from "lucide-react";

interface PersonalMember {
  id: string;
  name: string;
  role: "MEDICO" | "PARAMEDICO" | "CONDUCTOR" | "ENFERMERO";
  baseId: number;
  phone: string;
  email: string;
  color: string;
  speciality?: string;
  license?: string;
  active: boolean;
}

interface PersonalCardProps {
  member: PersonalMember;
  onEdit?: (member: PersonalMember) => void;
  onDelete?: (id: string) => void;
}

const PersonalCard = ({ member, onEdit, onDelete }: PersonalCardProps) => {
  const getRoleBadge = (role: PersonalMember["role"]) => {
    const variants = {
      MEDICO: <Badge className="bg-red-600 text-white">Médico</Badge>,
      PARAMEDICO: <Badge className="bg-blue-600 text-white">Paramédico</Badge>,
      CONDUCTOR: <Badge className="bg-green-600 text-white">Conductor</Badge>,
      ENFERMERO: <Badge className="bg-purple-600 text-white">Enfermero</Badge>,
    };
    return variants[role];
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div
              className="w-10 h-10 rounded-full flex items-center justify-center"
              style={{ backgroundColor: member.color }}
            >
              <User className="h-5 w-5 text-white" />
            </div>
            <div>
              <CardTitle className="text-base">{member.name}</CardTitle>
              <div className="mt-1">{getRoleBadge(member.role)}</div>
            </div>
          </div>
          <div className="flex gap-1">
            {onEdit && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onEdit(member)}
              >
                <Edit className="h-4 w-4" />
              </Button>
            )}
            {onDelete && (
              <Button
                variant="ghost"
                size="sm"
                onClick={() => onDelete(member.id)}
              >
                <Trash2 className="h-4 w-4 text-destructive" />
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-2 text-sm">
        {member.speciality && (
          <div className="flex items-center gap-2 text-muted-foreground">
            <Calendar className="h-4 w-4" />
            <span>{member.speciality}</span>
          </div>
        )}
        {member.license && (
          <div className="text-xs text-muted-foreground">
            Licencia: {member.license}
          </div>
        )}
        <div className="flex items-center gap-2 text-muted-foreground">
          <Phone className="h-4 w-4" />
          <span>{member.phone}</span>
        </div>
        <div className="flex items-center gap-2 text-muted-foreground">
          <Mail className="h-4 w-4" />
          <span className="truncate">{member.email}</span>
        </div>
        <div className="pt-2">
          <Badge variant={member.active ? "default" : "secondary"}>
            {member.active ? "Activo" : "Inactivo"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};

export default PersonalCard;
