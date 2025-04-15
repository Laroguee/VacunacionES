# **App Name**: VacunaciónES

## Core Features:

- Medical Staff Login: Login page for medical staff with a placeholder for future Firebase authentication integration.
- Add Patient: Form to add new patients, storing data locally in a structure ready for Firebase integration.
- Search Patient: Form to search for existing patients, storing data locally in a structure ready for Firebase integration.
- Vaccine Registration: Form to record administered vaccines and schedule the next appointment. The form includes validation for all fields, and the application stores the data locally, but is ready for Firebase integration.
- Print Vaccination History: Generate and display a printable vaccination history with fields for DUI, phone number, and responsible doctor ID.  The information is displayed in a printer-friendly format.
- National Vaccination Scheme: Display a table showing the national vaccination schedule for different age groups. The table should be editable by the user. Store the table information in temporary local storage.
- Export Vaccination History (PDF): Provide an option to export the vaccination history as a PDF file.
- DUI Validation: Add validation to the DUI field to ensure it matches the correct format (########-#).

## Style Guidelines:

- Primary color: Light teal (#A0E7E5) for a calming and professional feel.
- Secondary color: Soft grey (#E8E8E8) for backgrounds and content separation.
- Accent: Dark green (#3A7D42) for primary actions and important information.
- Clean and simple layout with clear sections for each function.
- Use of easily recognizable medical icons for menu options and important actions.
- Subtle transitions and animations for user feedback and navigation.
- Use colors with good contrast to enhance visibility, especially in low-light conditions.
- Ensure buttons are large and easily tappable, suitable for tablet use.

## Original User Request:
Crea una página web responsive orientada a personal médico, que permita registrar y gestionar el historial de vacunación de infancia y adolescencia, basado en el esquema nacional de vacunación de El Salvador.

Requisitos funcionales:
Login para personal médico (interfaz simple, sin base de datos implementada aún, pero lista para ello en fase de pruebas).

Menú principal con las siguientes opciones:

Actualizar esquema de vacunación

Buscar paciente

Añadir paciente

Registrar vacuna aplicada y próxima cita

Imprimir historial de vacunación

En la opción de imprimir historial de vacunación, se debe permitir ingresar:

Número de DUI

Número de celular

ID del médico responsable

Requisitos técnicos:
Diseño responsive (adaptable a móviles, tabletas y computadoras).

Toda la lógica debe estar lista para conectar con Firebase, pero sin base de datos activa (solo estructuras preparadas).

Usa formularios funcionales con campos validados.

Interfaz amigable y orientada a usuarios del área de salud.
Agregar una pantalla/resumen de “Esquema de Vacunación Nacional”

Puedes incluir una tabla o vista general editable que contenga el esquema oficial por edades, como referencia o checklist.

Podría ser parte de “Actualizar esquema de vacunación”.

Almacenamiento temporal con persistencia (ej. localStorage o IndexedDB)
Si Firebase aún no se integra, quizá puedas mantener la información local aunque se cierre el navegador, al menos en pruebas.

Campos de validación para DUI (formato correcto)
Puedes usar una regex sencilla para validar que el DUI tenga el formato adecuado de El Salvador (ej. ########-#).

Accesibilidad y adaptación para usuarios en áreas rurales (si aplica)
Considera colores con buen contraste y botones grandes, por si se usa en tablets o con poca luz.

Exportación de historial en PDF
Si no está incluido, una opción para guardar como PDF puede ser útil si no hay impresora a mano.
  