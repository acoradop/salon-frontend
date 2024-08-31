import React from 'react';
import {
  Box,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Button,
  VStack,
  Flex,
  useDisclosure,
} from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import logo from '../admin/Imagenes/Logoconfondo.jpg';
import citas from './Imagenes/citahoy.png';
import citasHover from './Imagenes/citahoypink.png'; // Ícono alternativo
import calendario from './Imagenes/calendario.png';
import calendarioHover from './Imagenes/calendariopink.png'; // Ícono alternativo
import clientes from './Imagenes/clientes.png';
import clientesHover from './Imagenes/clientespink.png'; // Ícono alternativo
import servicios from './Imagenes/servicios.png';
import serviciosHover from './Imagenes/serviciospink.png'; // Ícono alternativo
import menuIcon from './Imagenes/menu.png';

const Nav = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const navigate = useNavigate();

  const menuItems = [
    { label: 'Citas', to: '/citas', icon: citas, iconHover: citasHover },
    { label: 'Agendar', to: '/calendario', icon: calendario, iconHover: calendarioHover },
    { label: 'Clientes', to: '/clientes', icon: clientes, iconHover: clientesHover },
    { label: 'Servicios', to: '/servicios', icon: servicios, iconHover: serviciosHover },
  ];

  const handleNavigation = (to) => {
    navigate(to);
    onClose();
  };

  return (
    <>
      <Button
        onClick={onOpen}
        variant="outline"
        colorScheme="teal"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          backgroundColor: 'transparent',
          border: 'none',
          padding: '0',
        }}
      >
        <img src={menuIcon} alt="Menú" style={{ width: '25px', height: '25px' }} />
      </Button>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent bg="#FFA8C6" color="white">
            <DrawerCloseButton />
            <DrawerHeader borderBottomWidth="0" pb={4}>
              <Flex direction="column" align="center" mb={4}>
                <Box
                  width="125px"
                  height="100px"
                  borderRadius="50%"
                  overflow="hidden"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
                  bg="#FFFF"
                >
                  <img
                    src={logo}
                    alt="Logo"
                    style={{
                      width: '70%',
                      height: 'auto',
                      objectFit: 'contain'
                    }}
                  />
                </Box>
              </Flex>
            </DrawerHeader>
            <DrawerBody p={0}>
              <VStack spacing={0} align="stretch">
                {menuItems.map((item) => (
                  <Button
                    key={item.label}
                    onClick={() => handleNavigation(item.to)}
                    variant="outline"
                    borderColor="#FFFF"
                    borderTopWidth="3px"
                    borderBottomWidth="3px"
                    borderLeftWidth="0"
                    borderRightWidth="0"
                    color="white"
                    _hover={{
                      bg: '#FFE4E5',
                      color: '#FFA8C6',
                      '& img': {
                        content: `url(${item.iconHover})`
                      }
                    }}
                    width="100%"
                    height="60px"
                    display="flex"
                    alignItems="center"
                    justifyContent="space-between"
                    rounded="none"
                    fontFamily="'Judson', serif"
                    fontSize="xl"
                    fontWeight="bold"
                  >
                    <Box as="span" flex={1} textAlign="left">
                      {item.label}
                    </Box>
                    <img src={item.icon} alt={`${item.label} icon`} style={{ width: '40px', height: '40px' }} />
                  </Button>
                ))}
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </>
  );
};

export default Nav;
