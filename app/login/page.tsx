"use client"
import Head from 'next/head';
import React, { FormEvent, useEffect, useState } from "react";
import Image from 'next/image';
import { headers } from 'next/headers'
import { redirect, useRouter } from 'next/navigation';
import { BACKEND_URL } from '../Core/fromTurorial/utils/constants';
import {
  Alert, FlexGrid,
  H3,
  Body1,
  Spacing,

  theme,
  ThemeProps, Caption, H1, ThemeProvider, Card, Truncate, Subheading,
  TextInput, Button, Link, SubtleButton, Body2, Modal
} from "@burstsms/react-components";

import { createGlobalStyle, styled } from "styled-components";

import { normalize } from 'styled-normalize';
import { bool } from 'envalid';
//import pavIcon from '/images/sqncr-icon.png';
//import sqncrLogo from '/images/sqncr-logo-front.png';

interface Props {
  id?: string;
  className?: string;
  open: boolean;
}

const GlobalStyle = createGlobalStyle`
      ${normalize}
  `;
const StyledContainer = styled(FlexGrid.Column)`
  padding: 10px;
  color: theme.colors.primary.blue;
`;
export const Container = styled.div`
	display: flex;
	flex-direction: column;
	align-items: center;
	justify-content: center;
	min-height: 100vh;
	max-width: 320px;
	margin: 0 auto;
	padding: 50px 0;
	text-align: center;
`;

export const metaTitle = 'Sequencer Login Page';
export const description = 'Page for login to sequencer'
export const favicon = ''




export const FormContainer = styled.div`
	display: flex;
	flex-direction: column;
	background: ${(props: ThemeProps) => props.theme.colors.neutral.white};
`;

export const FormTitle = styled.div`
	border: 1px solid
		${({ theme }: ThemeProps) => theme.colors.neutral.lightGrey.$7};
	border-left: none;
	height: 64px;
	padding: 0 24px;
	display: flex;
	align-items: center;
`;

export const FormContent = styled.div`
	padding: 24px;
`;

export default function login() {

  useEffect(() => { });
  const [loginFailed, setIsVisible] = useState(false);
  const [errorLogin, setErrorLogin] = useState('');
  const [openModal, setOpenModal] = useState(false);
  const [openModalAfter2FA, setOpenModalAfter2F] = useState(false);
  const [accountPhoneNumber, setAccountPhoneNumber] = useState('');
  const [jWTToken, setJWTToken] = useState('');
  const [contentModalAfter2FA, setContentModalAfter2FA] = useState('');
  const [statusModalAfter2FA, setStatusModalAfter2FA] = useState('');
  const router = useRouter();

 
  async function submit2FAcode(twoFAcode: string, jWTToken: String) {

    let statusResultModalAfer: string = 'error';
    let contentModal: string = '';
    const arrData = {
      twoFAcode
    }
    const response = await fetch(BACKEND_URL + '/loginConfirm2FA?twoFAcode=' + twoFAcode, {
      method: 'GET',
      headers: {
        Authorization: 'Bearer ' + jWTToken
      },
      //  body: JSON.stringify(arrData)
    });

    //await api.post('/login', { id: '1', name: 'Test post' });
    // Handle response if necessary
    const data = await response.json()
    setOpenModal(openModal => false)
    if (data.hasOwnProperty('error') && data['error']['code'] == 'SUCCESS') {
      setContentModalAfter2FA('Authentication code correct, redirect to activity page...')
      setOpenModalAfter2F(true)
      statusResultModalAfer = 'success'
    
      router.push('/home');
      setOpenModalAfter2F(false)

      /*  let arrResult = JSON.parse(data['result']);
        console.log(arrResult);
        console.log('login success');
        setAccountPhoneNumber(accountPhoneNumber => arrResult['mobileNumber'].trim())
        setOpenModal(openModal => true) */

    } else {
      localStorage.clear();
      setContentModalAfter2FA(' Wrong authentication code.')
      setOpenModalAfter2F(true)
      //setStatusOpenModalAfer(false) 
      // setStatusResultModalAfer('error')
      /*
      setIsVisible(loginFailed => true);
      setErrorLogin(errorLogin => data['error']['description']);
      console.log('login gagal'); */
    }
  }

  function onCancel() {
    setOpenModal(false)
  }
  function onCancelAfter2FA() {
    setOpenModalAfter2F(false)
  }
  function ModalAfterLogin2Fa() {

    return <Modal
      data-testid="loginAfter2FAModal"
      //		footer={modalFooterContent}
      open={openModalAfter2FA}
      icon="MobileOutlineMobilePhone"
      //footer={<><Button variant="primary" onClick={(e) => submit2FAcode(new2FaValue,jWTToken)}>Button</Button></>}

      onOpenChange={(o: boolean) => {
        if (!o) { onCancelAfter2FA() }
      }}
      onOutsideClickClose={true}
      title=" 2FA Confirmation Status"

    >
      <Alert variant="info" showCloseButton={false}>
        {contentModalAfter2FA}</Alert>

    </Modal>
  }


  function ModalLogin2Fa() {
    const [new2FaValue, setNew2FaValue] = useState('')
    let formattedPhone: string = '';

    if (accountPhoneNumber.length > 0) {
      let prefixLength: number = 4;
      let suffixLength: number = 3;

      let prefix = accountPhoneNumber.substring(0, prefixLength);
      let suffix = accountPhoneNumber.slice(-suffixLength);
      let nbStars = accountPhoneNumber.length - (prefixLength + suffixLength);

      formattedPhone = prefix + "*".repeat(nbStars) + suffix;
    }
    return <Modal
      data-testid="login2FAModal"
      //		footer={modalFooterContent}
      open={openModal}
      icon="MobileOutlineMobilePhone"
      footer={<><Button variant="primary" onClick={(e) => submit2FAcode(new2FaValue, jWTToken)}>SUBMIT</Button></>}
      onOpenChange={(o: boolean) => {
        if (!o) {
          onCancel();
        }
      }}
      //onOpenChange={() => { }}
      onOutsideClickClose={true}
      title=" 2FA Confirmation"

    >
      <Alert
        showCloseButton={false}
      >Please enter Authentication Code we send to {formattedPhone}</Alert>

      <Spacing height={24} />
      <TextInput
        label="Authentication Code"
        isRequired
        nativeProps={{
          name: 'authenticationCode',
          onChange: (e) => { setNew2FaValue(e.target.value) },
          //  value: 'type here'
        }}
        showLabel
        size="standard"
        type="text"
      />
    </Modal>
  }




  //const [openModalAfter, setOpenModalAfter] = useState(false);
  async function goLogin(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    localStorage.clear()
    const formData = new FormData(event.currentTarget)
    console.log(formData);

    const response = await fetch(BACKEND_URL + '/login', {
      method: 'POST',
      body: formData,
    });
    //await api.post('/login', { id: '1', name: 'Test post' });
    // Handle response if necessary
    const data = await response.json()
    if (data.hasOwnProperty('error') && data['error']['code'] == 'SUCCESS') {
      let arrResult = JSON.parse(data['result']);
      console.log(arrResult);
      console.log('login success');
      setAccountPhoneNumber(accountPhoneNumber => arrResult['mobileNumber'].trim())
      setOpenModal(openModal => true)
      setJWTToken(data['jwtToken'])
      localStorage.setItem('sequencerDataAccount', data['result']);
      localStorage.setItem('sequencerDataToken', data['jwtToken']);

    } else {
      setIsVisible(loginFailed => true);
      setErrorLogin(errorLogin => data['error']['description']);
      console.log('login gagal');
    }

  }
  return (

    <><GlobalStyle /><Head>
      <meta name="viewport" content="width=device-width, initial-scale=1, user-scalable=no" />
      <title>{metaTitle}</title>
      <meta name="description" content={description} />
      <link rel="icon" href={favicon} />
    </Head><Container>

        {loginFailed && <Alert variant="error" onCloseButtonClicked={() => { }}>
          {errorLogin}
        </Alert>
        }
        <Spacing height={24} />
        <Card
          hasOutline
          hasShadow
          padding={20}
          title="">
          <Image
            src="/images/sqncr-logo-front-login-new.png"
            alt="Illustration of a man with a question mark above his head"
            width={142}
            height={142}
          />
          <Subheading>
            <Caption color={theme.colors.alert.success.$5}>
              sqn.cr is an SMS text message sequencing system that uses the transmitsms.com API
            </Caption>
          </Subheading>
          <FormContainer>

            <FormContent>
              <form aria-label="campaign-type-form" onSubmit={goLogin}>
                <TextInput
                  label="Email"
                  type="email"
                  size="standard"
                  isRequired
                  nativeProps={{
                    name: 'email'
                    // onChange: () => {},
                    //  value: 'type here'
                  }}
                  showLabel
                  tooltip={{
                    side: 'left',
                    text: 'Testing label tooltip'
                  }}
                />
                <TextInput
                  label="Password"
                  isRequired
                  nativeProps={{
                    name: 'password'
                    // onChange: () => {},
                    //  value: 'type here'
                  }}
                  showLabel
                  size="standard"
                  type="password"
                  tooltip={{
                    side: 'left',
                    text: 'Your password'
                  }}
                />
                <Button style={{ width: '200px' }} variant="primary" type="submit" aria-label="SIGN IN">
                  SIGN IN
                </Button>
                <Spacing height={24} />
                <Link onClick={() => { }}>
                  Forgot Password
                </Link>

                <Spacing height={24} />
                <Button
                  onClick={() => { }}
                  onIconClick={() => { }}
                  variant="tertiary"
                  style={{ width: '200px' }}
                >
                  Connect new account
                </Button>
              </form>
            </FormContent>
          </FormContainer>
          {ModalLogin2Fa()}

          {ModalAfterLogin2Fa()}
        </Card>

      </Container>


    </>



  )
}

