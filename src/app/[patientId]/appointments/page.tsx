const timeout = async(ms: number) => {
    return new Promise(resolve => setTimeout(resolve, ms))
}

const YourComponent: React.FC = async () => {
  await timeout(2000)
  return <div>Your Content</div>;
};

export default YourComponent;
