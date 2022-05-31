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
  saveTotalSellingAmount,
  saveSoftcap,
  saveRouter,
  saveLiquidity,
  saveStart,
  saveEnd,
  saveLockup,
  saveTotalTeamVestingTokens,
  saveTFirstReleaseTime,
  saveTFirstReleasePercent,
  saveTVestingPeriod,
  saveTEachReleasePercent,
  saveNeedTokenAmount,
  saveUsingTeamVesting,
} from '../../state/CreateFairLaunchState'

const DefiFairLaunchInfo = () => {

  const dispatch = useDispatch()
  const tokenAddr = useSelector((state) => state.createFairLaunchState.tokenAddress)  
  const tokenSymbol = useSelector((state) => state.createFairLaunchState.tokenSymbol)
  const basicSymbol = useSelector((state) => state.createFairLaunchState.basicSymbol)

  const history = useHistory()
  const [needAmount, setNeedAmount] = useState(0)

  const [total_selling_amount, setTotalSellingAmount] = useState(0)
  const [errMsgTotalSellingAmount, setErrMsgTotalSellingAmount] = useState('')

  const [softcap, setSoftCap] = useState(0)
  const [errMsgSoftCap, setErrMsgSoftCap] = useState('')

  const [liquidity, setLiquidity] = useState(0)
  const [errMsgLiquidity, setErrMsgLiquidity] = useState('')

  const [startDate, setStartDate] = useState(moment(new Date()))
  const [endDate, setEndDate] = useState(moment(new Date()).add(7, "days").subtract(1, "seconds"))
  const [dateTimeRange, setDateTimeRange] = useState(`${startDate.format("YYYY-MM-DD HH:mm")} - ${endDate.format("YYYY-MM-DD HH:mm")}`)
  
  const [lockupMinutes, setLockupMinutes] = useState(0)
  const [errMsgLockupMinutes, setErrMsgLockupMinutes] = useState('')

  const [total_team_vesting, setTotalTeamVestingTokens] = useState(0)
  const [errMsgTotalTeamVesting, setErrMsgTotalTeamVesting] = useState('')

  const [first_token_release_time, setTFirstReleaseTime] = useState(0)
  const [errMsgFirstTokenReleaseTime, setErrMsgFirstTokenReleaseTime] = useState('')
  
  const [first_release_percent, setTFirstReleasePercent] = useState(0)
  const [errMsgFirstReleasePercent, setErrMsgFirstReleasePercent] = useState('')

  const [vesting_period, setTVestingPeriod] = useState(0)
  const [errMsgVestingPeriod, setErrMsgVestingPeriod] = useState('')

  const [each_release_percent, setTEachReleasePercent] = useState(0)
  const [errMsgEachReleasePercent, setErrMsgEachReleasePercent] = useState('')

  const [isCheckedTeamVesting, setIsCheckedTeamVesting] = useState(false)
  const [isValid, setIsValid] = useState(false)

  const onChangeTotalSellingAmount = (e) => {  
    setTotalSellingAmount((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeSoftCap = (e) => {
    setSoftCap((v) => (e.target.validity.valid ? e.target.value : v))
  }

  const onChangeLiquidity = (e) => {
    setLiquidity((v) => (e.target.validity.valid ? e.target.value : v))
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
    setEndDate(enddate)
  }

  const handleRange = (index, value) => {
    console.log(index, value);
  }

  const handleDateTimeRangeChanged = (rng) => {
    console.log(rng)
  }

  const onChangeLockupMinutes = (e) => {
    setLockupMinutes((v) => (e.target.validity.valid ? e.target.value : v))
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

  const onChangeTeamVesting = (e) => {
    setIsCheckedTeamVesting(e.target.checked)
  }

  const handleNext = () => {
    dispatch(saveNeedTokenAmount(needAmount))
    dispatch(saveTotalSellingAmount(total_selling_amount))
    dispatch(saveSoftcap(softcap))
    dispatch(saveRouter('Pancakeswap'))
    dispatch(saveStart(startDate.unix() * 1000))
    dispatch(saveEnd(endDate.unix() * 1000))
    dispatch(saveLockup(lockupMinutes))
    dispatch(saveLiquidity(liquidity))
    dispatch(saveTotalTeamVestingTokens(total_team_vesting))
    dispatch(saveTFirstReleaseTime(first_token_release_time))
    dispatch(saveTFirstReleasePercent(first_release_percent))
    dispatch(saveTVestingPeriod(vesting_period))
    dispatch(saveTEachReleasePercent(each_release_percent))
    dispatch(saveUsingTeamVesting(isCheckedTeamVesting))
    history.push("/fairlaunch/add_additional_info");
  }

  const calcNeedToken = (selling, liquidity) => {
    const value = selling * 1.02 + liquidity / 100 * 0.98 * selling
    setNeedAmount(value)
  }

  useEffect(() => {
    calcNeedToken(total_selling_amount, liquidity)
  },[total_selling_amount, liquidity])

  useEffect(() => {
    if( +total_selling_amount <= 0 ) {
      setErrMsgTotalSellingAmount('Total selling amount cannot be blank')
    } else {
      setErrMsgTotalSellingAmount('');
    }

    if( +softcap <= 0 ) {
      setErrMsgSoftCap('Softcap cannot be blank')
    } else {
      setErrMsgSoftCap('')
    }

    if (+liquidity <= 50) {
      setErrMsgLiquidity('Liquidity must be greater than 50%')
    } else if (+liquidity > 100) {
      setErrMsgLiquidity('Liquidity must be less than or equal 100%')
    } else {
      setErrMsgLiquidity('')
    }

    setDateTimeRange(`${startDate.format("YYYY-MM-DD HH:mm")} - ${endDate.format("YYYY-MM-DD HH:mm")}`)

    if( +lockupMinutes >= 5 ) {
      setErrMsgLockupMinutes('')
    } else {
      setErrMsgLockupMinutes('Lock up time must be greater than 5 minutes')
    }

    if( +total_team_vesting >= 1 ) {
      setErrMsgTotalTeamVesting('')
    } else {
      setErrMsgTotalTeamVesting('Total team vesting tokens cannot be blank')
    }

    if( +first_token_release_time >= 1 ) {
      setErrMsgFirstTokenReleaseTime('')
    } else {
      setErrMsgFirstTokenReleaseTime('First token release after listing cannot be blank')
    }

    if( +first_release_percent <= 0) {
      setErrMsgFirstReleasePercent('First token release cannot be blank')
    } else if( +first_release_percent > 100 ) {
      setErrMsgFirstReleasePercent('First token release must be less than or equal 100%')
    } else {
      setErrMsgFirstReleasePercent('')
    }

    if( +vesting_period >= 5 ) {
      setErrMsgVestingPeriod('')
    } else {
      setErrMsgVestingPeriod('Vesting period each cycle cannot be blank')
    }

    if(+each_release_percent <= 0) {
      setErrMsgEachReleasePercent('Team token release each cycle must be 1 or more')
    } else if(each_release_percent > (100 - first_release_percent) ) {
      setErrMsgEachReleasePercent('Team token release each cycle must be less than or equal ' + (100 - first_release_percent) + '%')
    } else {
      setErrMsgEachReleasePercent('')
    }
  },
    [
      total_selling_amount,
      softcap,
      liquidity,
      startDate,
      endDate,
      lockupMinutes,
      total_team_vesting,
      first_token_release_time,
      first_release_percent,
      vesting_period,
      each_release_percent,
    ])

  useEffect(() => {
    (
      errMsgTotalSellingAmount === '' &&
      errMsgSoftCap === '' &&
      errMsgLiquidity === '' &&
      errMsgLockupMinutes === ''
    ) ? setIsValid(true) : setIsValid(false)
  },[
    errMsgTotalSellingAmount,
    errMsgSoftCap,
    errMsgLiquidity,
    errMsgLockupMinutes
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
                    title='Total selling amount'
                    value={total_selling_amount}
                    onChange={onChangeTotalSellingAmount}
                    errMsg={errMsgTotalSellingAmount}
                  />
                </CRow>
                <div className="mt-3">
                  <CRow>
                    <NumberInputComponent
                      title={`SoftCap(${basicSymbol})`}
                      value={softcap}
                      onChange={onChangeSoftCap}
                      errMsg={errMsgSoftCap}
                    />
                  </CRow>
                </div>
                <div className="mt-3">
                  <CRow>
                    <p className='font-bold'>Router</p>
                    <div>
                      <CFormInput type="text" placeholder="PancakeSwap" value='PancakeSwap' disabled />
                    </div>
                  </CRow>
                </div>
                <div className="mt-3">
                  <CRow>
                    <NumberInputComponent
                      title='Liquidity (%)'
                      value={liquidity}
                      onChange={onChangeLiquidity}
                      errMsg={errMsgLiquidity}
                      desc=''
                      needInt
                    />
                    <p className="small-text-sz mt-1 mb-0 text-blue-color">Enter the percentage of raised funds that should be allocated to Liquidity on (Min 51%, Max 100%)</p>
                    <p className="small-text-sz mt-0 text-blue-color">If I spend 1 {basicSymbol} on how many tokens will I receive? Usually this amount is lower than presale rate to allow for a higher listing price on</p>
                  </CRow>
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
                <div className='mt-3'>
                  <CFormCheck
                    id="teamCheckbox"
                    label="Using Team Vesting?"
                    onChange={onChangeTeamVesting} />
                </div>
                  {
                    isCheckedTeamVesting ? (
                      <div>
                        <div className='mt-3'>
                          <CAlert color="warning">
                            Team Vesting doesn&apos;t support rebase tokens.
                          </CAlert>
                          <CRow>
                            <CCol>
                              <NumberInputComponent
                                title='Total team vesting tokens'
                                value={total_team_vesting}
                                onChange={onChangeTotalTeamVestingTokens}
                                errMsg={errMsgTotalTeamVesting}
                                desc=''
                                needInt
                              />
                            </CCol>
                            <CCol>
                              <NumberInputComponent
                                title='First token release after listing (minutes)'
                                value={first_token_release_time}
                                onChange={onChangeTFirstReleaseTime}
                                errMsg={errMsgFirstTokenReleaseTime}
                                desc=''
                                needInt
                              />
                            </CCol>
                          </CRow>
                        </div>
                        <div className='mt-3'>
                          <NumberInputComponent
                            title='First token release (percent)'
                            value={first_release_percent}
                            onChange={onChangeTFirstReleasePercent}
                            errMsg={errMsgFirstReleasePercent}
                            desc=''
                            needInt
                          />
                        </div>
                        <div className='mt-3'>
                          <CRow>
                            <CCol>
                              <NumberInputComponent
                                title='Vesting period each cycle (minutes)'
                                value={vesting_period}
                                onChange={onChangeTVestingPeriod}
                                errMsg={errMsgVestingPeriod}
                                desc=''
                                needInt
                              />
                            </CCol>
                            <CCol>
                              <NumberInputComponent
                                title='Team token release each cycle (percent)'
                                value={each_release_percent}
                                onChange={onChangeTEachReleasePercent}
                                errMsg={errMsgEachReleasePercent}
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

                  {/* <div className='mt-5'>
                    <p className='danger' style={{ textAlign: 'center' }}>Not enough balance in your wallet. Need 31.396 FLASH to create launchpad. (Your balance: 0 FLASH)</p>
                  </div> */}
                  <div className='mt-5'>
                    <p className='danger' style={{ textAlign: 'center' }}>Need {needAmount} {tokenSymbol} to create launchpad.</p>
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
              </CCardBody>
            </CCard>
          </CCol>
        </CRow>
      </CCol>
    </CRow>
  );
}

export default DefiFairLaunchInfo
