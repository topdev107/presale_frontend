import {
  CCard,
  CCardBody,
  CCol, CFormCheck, CFormInput, CFormSelect, CRow,
  CAlert,
} from '@coreui/react';
import CIcon from '@coreui/icons-react';
import { cilList, cilShieldAlt } from '@coreui/icons';


import moment from "moment-timezone";
import React, { useEffect, useState } from 'react';
import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
import { FormControl } from "react-bootstrap";
import NumberInputComponent from '../components/NumberInputComponent';
import WorkflowItem from "../components/WorkflowItem";
import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { 
  saveNeedTokenAmount,
  savePresaleRate,
  saveIsWhitelist,
  saveSoftcap,
  saveHardcap,
  saveMinBuy,
  saveMaxBuy,
  saveReturnType,
  saveRouter,
  saveLiquidity,
  saveListingRate,
  saveStart,
  saveEnd,
  saveLockup,
  saveCFirstReleasePercent,
  saveCVestingPeriod,
  saveCEachReleasePercent,
  saveTotalTeamVestingTokens,
  saveTFirstReleaseTime,
  saveTFirstReleasePercent,
  saveTVestingPeriod,
  saveTEachReleasePercent,
  saveCVest,
  saveTVest
} from '../../state/CreateLaunchPadState'

const DefiLaunchPadInfo = () => {

  const dispatch = useDispatch()
  const tokenAddr = useSelector((state) => state.createLaunchPadState.tokenAddress)
  // const tokenName = useSelector((state) => state.createLaunchPadState.tokenName)
  const tokenSymbol = useSelector((state) => state.createLaunchPadState.tokenSymbol)
  const basicSymbol = useSelector((state) => state.createLaunchPadState.basicSymbol)

  const history = useHistory();

  const [presaleRate, setPresaleRate] = useState(0)
  const [errMsgPresaleRate, setErrMsgPresaleRate] = useState('')

  const [isWhitelistEnable, setIsWhitelistEnable] = useState(false)

  const [softCap, setSoftCap] = useState(0)
  const [errMsgSoftCap, setErrMsgSoftCap] = useState('')

  const [hardCap, setHardCap] = useState(0)
  const [errMsgHardCap, setErrMsgHardCap] = useState('')

  const [minBuyBNB, setMinBuyBNB] = useState(0)
  const [errMsgMinBuyBNB, setErrMsgMinBuyBNB] = useState('')

  const [maxBuyBNB, setMaxBuyBNB] = useState(0)
  const [errMsgMaxBuyBNB, setErrMsgMaxBuyBNB] = useState('')

  const [refundType, setRefundType] = useState('Burn') // Burn, Refund
 
  const [liquidity, setLiquidity] = useState(0)
  const [errMsgLiquidity, setErrMsgLiquidity] = useState('')

  const [listingRate, setListingRate] = useState(0)
  const [errMsgListingRate, setErrMsgListingRate] = useState('')
  const [descListingRate, setDescListingRate] = useState('')

  const [startDate, setStartDate] = useState(moment(new Date()))
  const [endDate, setEndDate] = useState(moment(new Date()).add(7, "days").subtract(1, "seconds"))
  const [dateTimeRange, setDateTimeRange] = useState(`${startDate.format("YYYY-MM-DD HH:mm")} - ${endDate.format("YYYY-MM-DD HH:mm")}`)
  const [isValidDate, setValidDate] = useState(false)
  const [errMsgDate, setErrMsgDate] = useState('')

  const [lockupMinutes, setLockupMinutes] = useState(0)
  const [errMsgLockupMinutes, setErrMsgLockupMinutes] = useState('')

  const [isCheckedVestingContributor, setIsCheckedVestingContributor] = useState(false)

  const [cFirstReleasePercent, setCFirstReleasePercent] = useState(0)
  const [errMsgCFirstReleasePercent, setErrMsgCFirstReleasePercent] = useState('')

  const [cVestingPeriod, setCVestingPeriod] = useState(0)
  const [errMsgCVestingPeriod, setErrMsgCVestingPeriod] = useState('')

  const [cEachReleasePercent, setCEachReleasePercent] = useState(0)
  const [errMsgCEachReleasePercent, setErrMsgCEachReleasePercent] = useState('')

  const [isCheckedTeamVesting, setIsCheckedTeamVesting] = useState(false)

  const [totalTeamVestingTokens, setTotalTeamVestingTokens] = useState(0)
  const [errMsgTotalTeamVestingTokens, setErrMsgTotalTeamVestingTokens] = useState('')

  const [tFirstReleaseTime, setTFirstReleaseTime] = useState(0)
  const [errMsgtFirstReleaseTime, setErrMsgtFirstReleaseTime] = useState('')

  const [tFirstReleasePercent, setTFirstReleasePercent] = useState(0)
  const [errMsgTFirstReleasePercent, setErrMsgTFirstReleasePercent] = useState('')

  const [tVestingPeriod, setTVestingPeriod] = useState(0)
  const [errMsgTVestingPeriod, setErrMsgTVestingPeriod] = useState('')

  const [tEachReleasePercent, setTEachReleasePercent] = useState(0)
  const [errMsgTEachReleasePercent, setErrMsgTEachReleasePercent] = useState('')

  const [needToken, setNeedToken] = useState(0)
  const [isValid, setIsValid] = useState(false)

  const onChangePresaleRate = (e) => {
    setPresaleRate((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeSoftCap = (e) => {
    setSoftCap(e.target.value)
    // setSoftCap((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeHardCap = (e) => {
    setHardCap((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeMinBuy = (e) => {
    setMinBuyBNB((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeMaxBuy = (e) => {
    setMaxBuyBNB((v) => (e.target.validity.valid ? e.target.value : v))
  } 

  const onChangeRefundType = (e) => {
    setRefundType(e.target.value)
  }

  const onChangeLiquidity = (e) => {
    setLiquidity((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeListingRate = (e) => {
    setListingRate((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeWhitelist = (val) => {
    if (val === 'disable') {
      setIsWhitelistEnable(false)
    } else {
      setIsWhitelistEnable(true)
    }
  }

  // DateTimeRangePicker Part
  let now = new Date();
  let start = moment(
    new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0)
  );
  let end = moment(start).add(1, "days").subtract(1, "seconds");

  let ranges = {
    "Today Only": [moment(start), moment(end)],
    "Yesterday Only": [
      moment(start).subtract(1, "days"),
      moment(end).subtract(1, "days")
    ],
    "3 Days": [moment(start), moment(start).add(1, "days")],
    "5 Days": [moment(start), moment(start).add(5, "days")],
    "1 Week": [moment(start), moment(start).add(7, "days")],
    "2 Weeks": [moment(start), moment(start).add(14, "days")],
    "1 Month": [moment(start), moment(start).add(1, "months")],
    "1 Year": [moment(start), moment(start).add(1, "years")]
  };

  let local = {
    format: "YYYY-MM-DD HH:mm",
    sundayFirst: false
  };

  const handleDateTimeRangeApply = (startdate, enddate) => {
    setStartDate(startdate)
    console.log("startDateMoment", moment(startdate).utc())
    console.log("endDateMoment", moment(enddate).utc())

    console.log('startDate ===============>',moment(startdate).utc().format())
    console.log('NowDate moment ==============> ',moment.utc().format())
    // var ms = moment(now, "DD/MM/YYYY HH:mm:ss").diff(moment(then, "DD/MM/YYYY HH:mm:ss"));
    var ms = moment(startdate, "DD/MM/YYYY HH:mm:ss").diff(moment(now, "DD/MM/YYYY HH:mm:ss"))
    if(moment.duration(ms) < 0) {
      setErrMsgDate('Start time needs to be after now')
    }
    ms = moment(enddate, "DD/MM/YYYY HH:mm:ss").diff(moment(startdate, "DD/MM/YYYY HH:mm:ss"))
    if(moment.duration(ms) < 0) {
      setErrMsgDate('Start time needs to be before End time')
    }
    setEndDate(enddate)
  }

  const handleRange = (index, value) => {
    console.log(index, value);
  }

  const handleDateTimeRangeChanged = (rng) => {
    console.log(rng)
  }

  const calcNeedToken = (hardcap, presale, listing, liquidity) => {
    const value = hardcap * presale * 1.02 + 0.98 * hardcap * listing * liquidity / 100
    setNeedToken(value)
  }

  const onChangeLockupMinutes = (e) => {
    setLockupMinutes((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeVestingContributor = (e) => {
    setIsCheckedVestingContributor(e.target.checked)
  }

  const onChangeCFirstReleasePercent = (e) => {
    setCFirstReleasePercent((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeCVestingPeriod = (e) => {
    setCVestingPeriod((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeCEachReleasePercent = (e) => {
    setCEachReleasePercent((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeTeamVesting = (e) => {
    setIsCheckedTeamVesting(e.target.checked)
  }

  const onChangeTotalTeamVestingTokens = (e) => {
    setTotalTeamVestingTokens((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeTFirstReleaseTime = (e) => {
    setTFirstReleaseTime((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeTFirstReleasePercent = (e) => {
    setTFirstReleasePercent((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeTVestingPeriod = (e) => {
    setTVestingPeriod((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeTEachReleasePercent = (e) => {
    setTEachReleasePercent((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const handleNext = () => {
    dispatch(saveNeedTokenAmount(needToken))
    dispatch(savePresaleRate(presaleRate))    
    dispatch(saveIsWhitelist(isWhitelistEnable))
    dispatch(saveSoftcap(softCap))
    dispatch(saveHardcap(hardCap))
    dispatch(saveMinBuy(minBuyBNB))
    dispatch(saveMaxBuy(maxBuyBNB))
    dispatch(saveReturnType(refundType))
    dispatch(saveRouter('PancakeSwap'))
    dispatch(saveLiquidity(liquidity))
    dispatch(saveListingRate(listingRate))
    dispatch(saveStart(startDate.unix() * 1000))
    dispatch(saveEnd(endDate.unix() * 1000))
    // console.log('Start Date Timestamp: ', startDate.unix())
    // console.log('Start Date From Moment: ', moment(new Date(startDate.unix())).format)
    // console.log('Start Date: ', startDate)
    dispatch(saveCVest(isCheckedVestingContributor))
    dispatch(saveTVest(isCheckedTeamVesting))
    dispatch(saveLockup(lockupMinutes))
    dispatch(saveCFirstReleasePercent(cFirstReleasePercent))
    dispatch(saveCVestingPeriod(cVestingPeriod))
    dispatch(saveCEachReleasePercent(cEachReleasePercent))
    dispatch(saveTotalTeamVestingTokens(totalTeamVestingTokens))
    dispatch(saveTFirstReleaseTime(tFirstReleaseTime))
    dispatch(saveTFirstReleasePercent(tFirstReleasePercent))
    dispatch(saveTVestingPeriod(tVestingPeriod))
    dispatch(saveTEachReleasePercent(tEachReleasePercent))
    history.push("/launchpad/add_additional_info");
  }

  useEffect(() => {
    calcNeedToken(hardCap, presaleRate, listingRate, liquidity)
    if (+presaleRate <= 0) {
      setErrMsgPresaleRate('Presale rate must be positive number')
    } else {
      setErrMsgPresaleRate('')
    }

    if (+softCap > +hardCap) {
      setErrMsgSoftCap('Softcap must be less than or equal Hardcap')
    } else if (+softCap > 0 && +softCap * 2 < +hardCap) {
      setErrMsgSoftCap('Softcap must be greater than or equal 50% of Hardcap')
    } else if (+softCap <= 0) {
      setErrMsgSoftCap('Softcap must be positive number')
    } else {
      setErrMsgSoftCap('')
    }

    if (+hardCap <= 0) {
      setErrMsgHardCap('HardCap must be positive number')
    } else {
      setErrMsgHardCap('')
    }

    if (+minBuyBNB <= 0) {
      setErrMsgMinBuyBNB('Minimum buy must be positive number')
    } else if (+minBuyBNB >= +maxBuyBNB) {
      setErrMsgMinBuyBNB('Min buy must be less than max buy')
    } else {
      setErrMsgMinBuyBNB('')
    }

    if (+maxBuyBNB <= 0) {
      setErrMsgMaxBuyBNB('Maximum buy must be positive number')
    } else {
      setErrMsgMaxBuyBNB('')
    }

    if (+liquidity <= 50) {
      setErrMsgLiquidity('Liquidity must be greater than 50%')
    } else if (+liquidity > 100) {
      setErrMsgLiquidity('Liquidity must be less than or equal 100%')
    } else {
      setErrMsgLiquidity('')
    }

    if (+listingRate <= 0) {
      setErrMsgListingRate('Listing rate must be positive number')
    } else {
      setErrMsgListingRate('')
    }

    setDescListingRate(`1 ${basicSymbol} = ${+listingRate} ${tokenSymbol} `)

    setDateTimeRange(`${startDate.format("YYYY-MM-DD HH:mm")} - ${endDate.format("YYYY-MM-DD HH:mm")}`)

    if (+lockupMinutes >= 5) {
      setErrMsgLockupMinutes('')
    } else {
      setErrMsgLockupMinutes('Lock up time must be greater than 5 minutes')
    }

    if (+cFirstReleasePercent >= 1) {
      setErrMsgCFirstReleasePercent('')
    } else {
      setErrMsgCFirstReleasePercent('First release for presale must be 1 or more')
    }

    if (+cVestingPeriod >= 1) {
      setErrMsgCVestingPeriod('')
    } else {
      setErrMsgCVestingPeriod('Vesting period each cycle must be 1 or more')
    }

    if (+cEachReleasePercent >= 1) {
      setErrMsgCEachReleasePercent('')
    } else {
      setErrMsgCEachReleasePercent('Presale token release each cycle must be 1 or more')
    }

    if (+totalTeamVestingTokens >= 1) {
      setErrMsgTotalTeamVestingTokens('')
    } else {
      setErrMsgTotalTeamVestingTokens('Total team vesting tokens must be 1 or more')
    }

    if (+tFirstReleasePercent >= 1) {
      setErrMsgTFirstReleasePercent('')
    } else {
      setErrMsgTFirstReleasePercent('First token release must be 1 or more')
    }

    if (+tVestingPeriod >= 1) {
      setErrMsgTVestingPeriod('')
    } else {
      setErrMsgTVestingPeriod('Vesting period each cycle must be 1 or more')
    }

    if (+tEachReleasePercent >= 1) {
      setErrMsgTEachReleasePercent('')
    } else {
      setErrMsgTEachReleasePercent('Team token release each cycle must be 1 or more')
    }

    if ( +tFirstReleaseTime >= 1 ) {
      setErrMsgtFirstReleaseTime('')
    } else {
      setErrMsgtFirstReleaseTime('First token release after listing must be 1 or more')
    }
    
  },
    [
      presaleRate,
      softCap,
      hardCap,
      minBuyBNB,
      maxBuyBNB,
      liquidity,
      listingRate,
      startDate,
      endDate,
      lockupMinutes,
      cFirstReleasePercent,
      cVestingPeriod,
      cEachReleasePercent,
      totalTeamVestingTokens,
      tFirstReleaseTime,
      tFirstReleasePercent,
      tVestingPeriod,
      tEachReleasePercent
    ])

  useEffect(() => {
    (
      errMsgPresaleRate === '' &&
      errMsgSoftCap === '' &&
      errMsgHardCap === '' &&
      errMsgMinBuyBNB === '' &&
      errMsgMaxBuyBNB === '' &&
      errMsgLiquidity === '' &&
      errMsgLockupMinutes === '' &&
      errMsgListingRate === ''
    ) ? setIsValid(true) : setIsValid(false)
  },[
    errMsgPresaleRate, 
    errMsgSoftCap,
    errMsgHardCap,
    errMsgMinBuyBNB,
    errMsgMaxBuyBNB,
    errMsgLiquidity,
    errMsgLockupMinutes,
    errMsgListingRate,
  ])

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
              active
              title='DeFi Launchpad Info'
              desc='Enter the launchpad information that you want to raise , that should be enter all details about your presale' />
          </CCol>
          <CCol className="col-sm-3">
            <WorkflowItem
              stemNumber={3}
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
                  <NumberInputComponent
                    title='Presale rate'
                    value={presaleRate}
                    onChange={onChangePresaleRate}
                    errMsg={errMsgPresaleRate}
                    desc={`If I spend 1 ${basicSymbol} how many tokens will I receive?`}
                  />
                  <div>
                    <p className='font-bold'>Whitelist</p>
                    {
                      isWhitelistEnable ? (
                        <div>
                          <CFormCheck
                            inline type="radio"
                            name="inlineRadioOptions"
                            id="inlineCheckbox1"
                            value="disable"
                            label="Disable"
                            onChange={onChangeWhitelist} />
                          <CFormCheck
                            inline
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineCheckbox2"
                            value="enable"
                            label="Enable"
                            defaultChecked
                            onChange={onChangeWhitelist} />
                        </div>
                      ) : (
                        <div>
                          <CFormCheck
                            inline type="radio"
                            name="inlineRadioOptions"
                            id="inlineCheckbox1"
                            value="disable"
                            label="Disable"
                            defaultChecked
                            onChange={onChangeWhitelist} />
                          <CFormCheck
                            inline
                            type="radio"
                            name="inlineRadioOptions"
                            id="inlineCheckbox2"
                            value="enable"
                            label="Enable"
                            onChange={onChangeWhitelist} />
                        </div>
                      )
                    }
                    <p className="small-text-sz mt-1 text-blue-color">You can enable/disable whitelist anytime</p>
                  </div>
                  <div className='mt-3'>
                    <CRow className="display-block">
                      <CCol className='col-md-6'>
                        <NumberInputComponent
                          title={`SoftCap(${basicSymbol})`}
                          value={softCap}
                          onChange={onChangeSoftCap}
                          errMsg={errMsgSoftCap}
                          desc='Softcap must be &ge; 50% of Hardcap!'
                        />
                      </CCol>
                      <CCol className='col-md-6'>
                        <NumberInputComponent
                          title={`HardCap(${basicSymbol})`}
                          value={hardCap}
                          onChange={onChangeHardCap}
                          errMsg={errMsgHardCap}
                          desc=''
                        />
                      </CCol>
                    </CRow>
                  </div>
                  <div className='mt-3'>
                    <CRow className="display-block">
                      <CCol className='col-md-6'>
                        <NumberInputComponent
                          title={`Minimum buy (${basicSymbol})`}
                          value={minBuyBNB}
                          onChange={onChangeMinBuy}
                          errMsg={errMsgMinBuyBNB}
                          desc=''
                        />
                      </CCol>
                      <CCol className='col-md-6'>
                        <NumberInputComponent
                          title={`Maximum buy (${basicSymbol})`}
                          value={maxBuyBNB}
                          onChange={onChangeMaxBuy}
                          errMsg={errMsgMaxBuyBNB}
                          desc=''
                        />
                      </CCol>
                    </CRow>
                  </div>
                  <div>
                    <CRow className="display-block">
                      <CCol>
                        <p className='font-bold'>Refund type</p>
                        <div>
                          <CFormSelect onChange={onChangeRefundType} value={refundType}>
                            <option value="Burn">Burn</option>
                            <option value="Refund">Refund</option>
                          </CFormSelect>
                        </div>
                      </CCol>
                      <CCol>
                        <p className='font-bold'>Router</p>
                        <div>
                          <CFormInput type="text" placeholder="PancakeSwap" value='PancakeSwap' disabled />
                        </div>
                      </CCol>
                    </CRow>
                  </div>
                  <div className='mt-3'>
                    <CRow className="display-block">
                      <CCol>
                        <NumberInputComponent
                          title='Liquidity (%)'
                          value={liquidity}
                          onChange={onChangeLiquidity}
                          errMsg={errMsgLiquidity}
                          desc=''
                          needInt
                        />
                      </CCol>
                      <CCol>
                        <NumberInputComponent
                          title='Listing rate'
                          value={listingRate}
                          onChange={onChangeListingRate}
                          errMsg={errMsgListingRate}
                          desc={descListingRate}
                        />
                      </CCol>
                    </CRow>
                    <p className="small-text-sz mt-1 mb-0 text-blue-color">Enter the percentage of raised funds that should be allocated to Liquidity on (Min 51%, Max 100%)</p>
                    <p className="small-text-sz mt-0 text-blue-color">If I spend 1 {basicSymbol} on how many tokens will I receive? Usually this amount is lower than presale rate to allow for a higher listing price on</p>
                  </div>
                  <div className='mt-3'>
                    <p className='font-bold'>Select start time and end time (UTC)
                      <sup className="danger">*</sup>
                    </p>
                  </div>
                  <div>
                    <DateTimeRangeContainer
                      ranges={ranges}
                      start={startDate}
                      end={endDate}
                      local={local}
                      // maxDate={maxDate}
                      applyCallback={handleDateTimeRangeApply}
                      rangeCallback={handleRange}
                      smartMode
                    >
                      <FormControl
                        id="formControlsTextB"
                        type="text"
                        label="Text"
                        placeholder="Enter text"
                        style={{ cursor: "pointer" }}
                        // disabled={true}
                        onChange={handleDateTimeRangeChanged}
                        value={dateTimeRange}
                      />
                    </DateTimeRangeContainer>
                  </div>
                  <div className='mt-4'>
                    <NumberInputComponent
                      title='Liquidity lockup (minutes)'
                      value={lockupMinutes}
                      onChange={onChangeLockupMinutes}
                      errMsg={errMsgLockupMinutes}
                      desc=''
                    />
                  </div>
                  {/* <div className='mt-3'>
                    <CFormCheck
                      id="contributorCheckbox"
                      label="Using Vesting Contributor?"
                      onChange={onChangeVestingContributor} />
                  </div> */}
                  {
                    isCheckedVestingContributor ? (
                      <div>
                        <CAlert color="dark">
                          Vesting Contributor does not support rebase tokens.
                        </CAlert>
                        <div className='mt-3'>
                          <NumberInputComponent
                            title='First release for presale (percent)'
                            value={cFirstReleasePercent}
                            onChange={onChangeCFirstReleasePercent}
                            errMsg={errMsgCFirstReleasePercent}
                            desc=''
                            needInt
                          />
                        </div>
                        <div className='mt-3'>
                          <CRow>
                            <CCol>
                              <NumberInputComponent
                                title='Vesting period each cycle (minutes)'
                                value={cVestingPeriod}
                                onChange={onChangeCVestingPeriod}
                                errMsg={errMsgCVestingPeriod}
                                desc=''
                                needInt
                              />
                            </CCol>
                            <CCol>
                              <NumberInputComponent
                                title='Presale token release each cycle (percent)'
                                value={cEachReleasePercent}
                                onChange={onChangeCEachReleasePercent}
                                errMsg={errMsgCEachReleasePercent}
                                desc=''
                                needInt
                              />
                            </CCol>
                          </CRow>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )
                  }

                  {/* <div className='mt-3'>
                    <CFormCheck
                      id="teamCheckbox"
                      label="Using Team Vesting?"
                      onChange={onChangeTeamVesting} />
                  </div> */}

                  {
                    isCheckedTeamVesting ? (
                      <div>
                        <CAlert color="dark">
                          Team Vesting does not support rebase tokens.
                        </CAlert>
                        <div className='mt-3'>
                          <CRow>
                            <CCol>
                              <NumberInputComponent
                                title='Total team vesting tokens'
                                value={totalTeamVestingTokens}
                                onChange={onChangeTotalTeamVestingTokens}
                                errMsg={errMsgTotalTeamVestingTokens}
                                desc=''
                                needInt
                              />
                            </CCol>
                            <CCol>
                              <NumberInputComponent
                                title='First token release after listing (minutes)'
                                value={tFirstReleaseTime}
                                onChange={onChangeTFirstReleaseTime}
                                errMsg={errMsgtFirstReleaseTime}
                                desc=''
                                needInt
                              />
                            </CCol>
                          </CRow>
                        </div>
                        <div className='mt-3'>
                          <NumberInputComponent
                            title='First token release (percent)'
                            value={tFirstReleasePercent}
                            onChange={onChangeTFirstReleasePercent}
                            errMsg={errMsgTFirstReleasePercent}
                            desc=''
                            needInt
                          />
                        </div>
                        <div className='mt-3'>
                          <CRow>
                            <CCol>
                              <NumberInputComponent
                                title='Vesting period each cycle (minutes)'
                                value={tVestingPeriod}
                                onChange={onChangeTVestingPeriod}
                                errMsg={errMsgTVestingPeriod}
                                desc=''
                                needInt
                              />
                            </CCol>
                            <CCol>
                              <NumberInputComponent
                                title='Team token release each cycle (percent)'
                                value={tEachReleasePercent}
                                onChange={onChangeTEachReleasePercent}
                                errMsg={errMsgTEachReleasePercent}
                                desc=''
                                needInt
                              />
                            </CCol>
                          </CRow>
                        </div>
                      </div>
                    ) : (
                      <></>
                    )
                  }

                  <div className='mt-5'>
                    <p className='danger' style={{ textAlign: 'center' }}>Need {needToken} {tokenSymbol} to create launchpad.</p>
                  </div>

                  <div className="mt-3 d-grid gap-3 d-md-flex justify-content-md-center">
                    <button type="button" className="btn-black" onClick={history.goBack}>Back</button>
                    {/* <Link to="/" style={{ textDecoration: 'none' }} className="btn-black">Back</Link> */}
                    {
                      isValid === true ? 
                      <button type="button" className="btn-accent" onClick={handleNext}>Next</button> :
                      <button type="button" className="btn-black" disabled>Next</button>
                    }
                    {/* <button type="button" className="btn-accent">Next</button> */}
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

export default DefiLaunchPadInfo
