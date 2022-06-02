
import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CFormTextarea
} from '@coreui/react';
import moment from "moment-timezone";
import React, { useEffect, useState } from 'react';
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import { FormControl } from "react-bootstrap";
import NumberInputComponent from '../components/NumberInputComponent';
import UrlInputComponent from '../components/UrlInputComponent';
import WorkflowItem from "../components/WorkflowItem";
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { setToken, delToken, setTokenAddr } from '../../state/CreateLaunchPadState'
import { faImage, faGlobe } from "@fortawesome/free-solid-svg-icons";
import { faFacebook, faTwitter, faGithub, faReddit, faTelegram, faInstagram, faDiscord } from "@fortawesome/free-brands-svg-icons"
import { 
  saveLogoURL, 
  saveWebsite,
  saveFacebook,
  saveTwitter,
  saveGithub,
  saveTelegram,
  saveInstagram,
  saveDiscord,
  saveReddit,
  saveDesc } from '../../state/CreateLaunchPadState'

const AddAdditionalInfo = () => {

  const dispatch = useDispatch()
  const tokenAddr = useSelector((state) => state.createLaunchPadState.tokenAddress)

  const history = useHistory();

  const [logoURL, setLogoURL] = useState('')
  const [errMsgLogoURL, setErrMsgLogoURL] = useState('')

  const [website, setWebsite] = useState('')
  const [errMsgWebsite, setErrMsgWebsite] = useState('')

  const [facebook, setFacebook] = useState('')
  const [errMsgFacebook, setErrMsgFacebook] = useState('')

  const [twitter, setTwitter] = useState('')
  const [errMsgTwitter, setErrMsgTwitter] = useState('')

  const [github, setGithub] = useState('')
  const [errMsgGithub, setErrMsgGithub] = useState('')

  const [telegram, setTelegram] = useState('')
  const [errMsgTelegram, setErrMsgTelegram] = useState('')

  const [instagram, setInstagram] = useState('')
  const [errMsgInstagram, setErrMsgInstagram] = useState('')

  const [discord, setDiscord] = useState('')
  const [errMsgDiscord, setErrMsgDiscord] = useState('')

  const [reddit, setReddit] = useState('')
  const [errMsgReddit, setErrMsgReddit] = useState('')

  const [desc, setDesc] = useState('')
  const [errMsgDesc, setErrMsgDesc] = useState('')

  const [isValid, setIsValid] = useState(false)

  const isUrlValid = (url) => {
    if ((url.slice(0, 7) === 'http://' || url.slice(0, 8) === 'https://') && url.split('.').length > 1 && url.split('.')[1].length > 0) {
      return true;
    } else {
      return false;
    }
  }

  const onChangeLogoURL = (e) => {
    setLogoURL((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeWebsite = (e) => {
    setWebsite((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeFacebook = (e) => {
    setFacebook((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeTwitter = (e) => {
    setTwitter((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeGithub = (e) => {
    setGithub((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeTelegram = (e) => {
    setTelegram((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeInstagram = (e) => {
    setInstagram((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeDiscord = (e) => {
    setDiscord((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeReddit = (e) => {
    setReddit((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeDesc = (e) => {
    setDesc((v) => (e.target.validity.valid ? e.target.value : v))
  }
  const handleImageUploadLink = () => {
    window.open('https://upload.pinksale.finance/')
  }

  useEffect(() => {
    if (logoURL === '') {
      setErrMsgLogoURL('Logo can not be blank')
    } else if (isUrlValid(logoURL)) {
      setErrMsgLogoURL('')
    } else {
      setErrMsgLogoURL('Invalid URL')
    }

    if (website === '') {
      setErrMsgWebsite('Website can not be blank')
    } else if (isUrlValid(website)) {
      setErrMsgWebsite('')
    } else {
      setErrMsgWebsite('Invalid URL')
    }

    if (facebook === '' || isUrlValid(facebook)) {
      setErrMsgFacebook('')
    } else {
      setErrMsgFacebook('Invalid URL')
    }

    if (twitter === '' || isUrlValid(twitter)) {
      setErrMsgTwitter('')
    } else {
      setErrMsgTwitter('Invalid URL')
    }

    if (github === '' || isUrlValid(github)) {
      setErrMsgGithub('')
    } else {
      setErrMsgGithub('Invalid URL')
    }

    if (telegram === '' || isUrlValid(telegram)) {
      setErrMsgTelegram('')
    } else {
      setErrMsgTelegram('Invalid URL')
    }

    if (instagram === '' || isUrlValid(instagram)) {
      setErrMsgInstagram('')
    } else {
      setErrMsgInstagram('Invalid URL')
    }

    if (discord === '' || isUrlValid(discord)) {
      setErrMsgDiscord('')
    } else {
      setErrMsgDiscord('Invalid URL')
    }

    if (reddit === '' || isUrlValid(reddit)) {
      setErrMsgReddit('')
    } else {
      setErrMsgReddit('Invalid URL')
    }

    if (desc === '' || (desc.length > 127) && (desc.length <= 512)) {
      setErrMsgDesc('')
    } else if (desc.length < 128) {
      setErrMsgDesc('Description must be 128 characters or more')
    } else if (desc.length > 512) {
      setErrMsgDesc('Description must be 512 characters or less')
    }

    (
      errMsgLogoURL === '' &&
      errMsgWebsite === '' &&
      errMsgFacebook === '' &&
      errMsgTwitter === '' &&
      errMsgGithub === '' &&
      errMsgTelegram === '' &&
      errMsgInstagram === '' &&
      errMsgDiscord === '' &&
      errMsgReddit === '' &&
      errMsgDesc === ''
    ) ? setIsValid(true) : setIsValid(false)
  },
    [
      logoURL,
      website,
      facebook,
      twitter,
      github,
      telegram,
      instagram,
      discord,
      reddit,
      desc,
      isValid,
      errMsgLogoURL,
      errMsgWebsite,
      errMsgFacebook,
      errMsgTwitter,
      errMsgGithub,
      errMsgInstagram,
      errMsgDiscord,
      errMsgReddit,
      errMsgDesc
    ]
  )

  const handleNext = () => {
    dispatch(saveLogoURL(logoURL))
    dispatch(saveWebsite(website))
    dispatch(saveFacebook(facebook))
    dispatch(saveTwitter(twitter))
    dispatch(saveGithub(github))
    dispatch(saveTelegram(telegram))
    dispatch(saveInstagram(instagram))
    dispatch(saveDiscord(discord))
    dispatch(saveReddit(reddit))
    dispatch(saveDesc(desc))
    history.push("/launchpad/review");
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CRow className="hide-less-than-1026">
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={1}
              verified
              title='Verify Token'
              desc='Enter the token address and verify' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={2}
              verified
              title='DeFi Launchpad Info'
              desc='Enter the launchpad information that you want to raise , that should be enter all details about your presale' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={3}
              active
              title='Add Additional Info'
              desc='Let people know who you are' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={4}
              title='Finish'
              desc='Review your information' />
          </CCol>
        </CRow>
        <CRow className="mt-3">
          <CCol>
            <CCard className="mb-4 pb-5">
              <CCardBody>
                <CRow>
                  <p className="danger small-text-sz mb-0">(*) is required field.</p>
                  <div className='mt-3'>
                    <CRow className="display-block">
                      <CCol className='col-md-6'>
                        <UrlInputComponent
                          title='LogoURL'
                          value={logoURL}
                          onChange={onChangeLogoURL}
                          errMsg={errMsgLogoURL}
                          icon={faImage}
                          required
                          placeholder='Ex:https://...'
                          desc='URL must end with a supported image extension png, jpg, jpeg or gif. You can upload your image at'
                          extra={<p className="small-text-sz text-accent-color text-link-accent" onClick={handleImageUploadLink}>https://upload.pinksale.finance/</p>}
                        />
                      </CCol>
                      <CCol className='col-md-6'>
                        <UrlInputComponent
                          title='Website'
                          value={website}
                          required
                          placeholder='Ex:https://...'
                          icon={faGlobe}
                          onChange={onChangeWebsite}
                          errMsg={errMsgWebsite}
                        />
                      </CCol>
                    </CRow>
                  </div>

                  <div className='mt-3'>
                    <CRow className="display-block">
                      <CCol className='col-md-6'>
                        <UrlInputComponent
                          title='Facebook'
                          value={facebook}
                          placeholder='Ex:https://facebook.com/...'
                          onChange={onChangeFacebook}
                          errMsg={errMsgFacebook}
                          icon={faFacebook}
                        />
                      </CCol>
                      <CCol className='col-md-6'>
                        <UrlInputComponent
                          title='Twitter'
                          value={twitter}
                          icon={faTwitter}
                          placeholder='Ex:https://twitter.com/...'
                          onChange={onChangeTwitter}
                          errMsg={errMsgTwitter}
                        />
                      </CCol>
                    </CRow>
                  </div>

                  <div className='mt-3'>
                    <CRow className="display-block">
                      <CCol className='col-md-6'>
                        <UrlInputComponent
                          title='Github'
                          value={github}
                          placeholder='Ex:https://github.com/...'
                          onChange={onChangeGithub}
                          errMsg={errMsgGithub}
                          icon={faGithub}
                        />
                      </CCol>
                      <CCol className='col-md-6'>
                        <UrlInputComponent
                          title='Telegram'
                          value={telegram}
                          placeholder='Ex:https://t.me/...'
                          icon={faTelegram}
                          onChange={onChangeTelegram}
                          errMsg={errMsgTelegram}
                        />
                      </CCol>
                    </CRow>
                  </div>

                  <div className='mt-3'>
                    <CRow className="display-block">
                      <CCol className='col-md-6'>
                        <UrlInputComponent
                          title='Instagram'
                          value={instagram}
                          placeholder='Ex:https://instagram.com/...'
                          onChange={onChangeInstagram}
                          errMsg={errMsgInstagram}
                          icon={faInstagram}
                        />
                      </CCol>
                      <CCol className='col-md-6'>
                        <UrlInputComponent
                          title='Discord'
                          value={discord}
                          icon={faDiscord}
                          placeholder='Ex:https://t.me/...'
                          onChange={onChangeDiscord}
                          errMsg={errMsgDiscord}
                        />
                      </CCol>
                    </CRow>
                  </div>

                  <div className='mt-3'>
                    <UrlInputComponent
                      title='Reddit'
                      value={reddit}
                      placeholder='Ex:https://reddit.com/...'
                      onChange={onChangeReddit}
                      errMsg={errMsgReddit}
                      icon={faReddit}
                    />
                  </div>

                  <div className="mt-3">
                    <p className='font-bold'>Description</p>
                    <CFormTextarea
                      value={desc}
                      placeholder='Ex: This is the best project...'
                      onChange={onChangeDesc}
                    />
                    <p className='danger small-text-sz mb-0'>{errMsgDesc}</p>
                  </div>
                  <div className="mt-3 d-grid gap-3 d-md-flex justify-content-md-center">
                    <button type="button" className="btn-black" onClick={history.goBack}>Back</button>
                    {
                      isValid ? (
                        <button type="button" className="btn-accent" onClick={handleNext}>Next</button>
                      ) : (
                        <button type="button" className="btn-disabled">Next</button>
                      )
                    }
                  </div>
                </CRow>
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  );
}

export default AddAdditionalInfo
