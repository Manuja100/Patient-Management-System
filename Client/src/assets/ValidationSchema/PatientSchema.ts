import * as Yup from 'yup'

const error = {
  serialNumber: 'Serial Number is required',
  dateOfRegistration: 'Date of Registration is required',
  dateOfBirth: 'Date of Birth is required',
  name: 'Name is required',
  district: 'District is required',
  clinicRegNumber: 'Clinic Registration Number is required',
  address: 'Address is required',
  phoneNo: 'Phone Number is required',
  occupation: 'Occupation is required',
  diagnosis: 'Diagnosis is required',
  consultantResponsible: 'Consultant Responsible is required',
  nic: 'Nic is required',
  priority: 'Priority is required',
  gender: 'Gender is required',
  race: 'Race is required',
  religion: 'Religion is required'
}

export const PatientSchema = Yup.object().shape({
  serialNo: Yup.string().required(error.serialNumber),
  dateOfRegistration: Yup.string().required(error.dateOfRegistration),
  name: Yup.string().required(error.name),
  district: Yup.string().required(error.district),
  clinicRegNo: Yup.string().required(error.clinicRegNumber),
  address: Yup.string().required(error.address),
  contactNo: Yup.string()
    .matches(/^\+?\d{9,12}$/, 'phone number is not valid')
    .required(error.phoneNo),
  occupation: Yup.string().required(error.occupation),
  diagnosis: Yup.string().required(error.diagnosis),
  consultantResponsible: Yup.string().required(error.consultantResponsible),
  specialNotes: Yup.string(),
  NIC: Yup.string().required(error.nic),
  starPriorityLevel: Yup.number().min(1).max(5).required(error.priority),
  dateOfBirth: Yup.string().required(error.dateOfBirth),
  gender: Yup.string().required(error.gender),
  race: Yup.string().required(error.race),
  religion: Yup.string().required(error.religion)
})
