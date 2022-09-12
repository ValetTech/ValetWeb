// import Counter from '../features/counter/Counter';
import { SimpleGrid } from '@mantine/core';
import AuthenticationForm from '../Components/AuthenticationForm/AuthenticationForm';
import '../index.css';

function Home() {
  return (
    <SimpleGrid
      cols={3}
      className="px-5"
      breakpoints={[
        { maxWidth: 980, cols: 3, spacing: 'md' },
        { maxWidth: 755, cols: 2, spacing: 'sm' },
        { maxWidth: 600, cols: 1, spacing: 'sm' },
      ]}
    >
      <AuthenticationForm />

      <div className="bg-white">1</div>
      <div className="bg-white">2</div>
      <div className="bg-white">3</div>
      <div className="bg-white">4</div>
      <div className="bg-white">5</div>
    </SimpleGrid>
  );
}

export default Home;
