const Hello = ({ params }: { params: { patientId: string } }) => {
    return <div>Hi there, {params.patientId}</div>
}

export default Hello