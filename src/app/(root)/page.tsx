const Hello = () => {
    return <div>This is just a placeholder. We need this because in the (root) group, Next needs to have a page.tsx, even if we're not using it. In this case we're not because in layout.tsx we are redirecting to [patientId] immediately. But even so, this page.tsx is needed to satisfy Next.</div>
}

export default Hello