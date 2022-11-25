import {
  BackgroundImage,
  Box,
  Container,
  createStyles,
  Group,
  Paper,
  SimpleGrid,
  Title,
} from '@mantine/core';
import BookingModal from '../Components/Sake/BookingModal';
import EmailBanner from '../Components/Sake/EmailBanner';
import HeaderPrimary from '../Components/Sake/HeaderPrimary';
import ImageActionBanner from '../Components/Sake/ImageBanner';

export default function Sake() {
  const links = [
    {
      link: '/about',
      label: 'Venues',
    },
    {
      link: '#1',
      label: 'Learn',
      links: [
        {
          link: '/docs',
          label: 'Documentation',
        },
        {
          link: '/resources',
          label: 'Resources',
        },
        {
          link: '/community',
          label: 'Community',
        },
        {
          link: '/blog',
          label: 'Blog',
        },
      ],
    },
    {
      link: '/about',
      label: 'Chefs',
    },
    {
      link: '/pricing',
      label: 'Pricing',
    },
    {
      link: '#2',
      label: 'Inquiries',
      links: [
        {
          link: '/faq',
          label: 'FAQ',
        },
        {
          link: '/demo',
          label: 'Book a demo',
        },
        {
          link: '/forums',
          label: 'Forums',
        },
      ],
    },
  ];

  return (
    <>
      <HeaderPrimary links={links} />
      <BackgroundImage
        mt={100}
        src="src/Components/Sake/SakeAssets/background-image.jpg"
      >
        <SimpleGrid pb={545} cols={3}>
          <ImageActionBanner
            mt={100}
            ml={70}
            radius={20}
            title="Welcome to Sake!"
            description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vestibulum in elit nec elit eleifend congue. Sed eu libero eu erat lacinia facilisis in vitae ante"
            image="src/Components/Sake/SakeAssets/make_booking_banner_image.jpg"
            action={{
              label: 'Make a Booking',
              link: 'asdklj',
            }}
          />
        </SimpleGrid>
      </BackgroundImage>
    </>
  );
}
