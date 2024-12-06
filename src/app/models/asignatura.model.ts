export interface Asignatura {
  id: string; // Identificador único
  year: string; // Año (ejemplo: "2024")
  semester: string; // Semestre (ejemplo: "2")
  campus: string; // Sede (ejemplo: "SJ")
  code: string; // Código de la asignatura (ejemplo: "CSY4111")
  profesorId: string; // ID del profesor (ejemplo: "24234263")
  modality: string; // Modalidad (ejemplo: "PCT")
  formattedName?: string; // Nombre formateado (opcional)
}
