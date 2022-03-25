
import {
    CCard,
    CCardBody,
    CCol, CFormCheck, CFormInput, CFormSelect, CRow
  } from '@coreui/react';
  import moment from "moment-timezone";
  import React, { useEffect, useState } from 'react';
  import DateTimeRangeContainer from "react-advanced-datetimerange-picker";
  import { FormControl } from "react-bootstrap";
  import NumberInputComponent from './components/NumberInputComponent';
  import WorkflowItem from "./components/WorkflowItem";
  import { HashRouter, Route, Switch, Link, useHistory } from 'react-router-dom'
  import { useDispatch, useSelector } from 'react-redux'
  import { setToken, delToken, setTokenAddr } from '../state/CreateLaunchPadState'
  
  const AddAdditionalInfo = () => {
  
    const dispatch = useDispatch()
    const tokenAddr = useSelector((state) => state.createLaunchPadState.tokenAddress)  
  
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
  
    const [liquidity, setLiquidity] = useState(0)
    const [errMsgLiquidity, setErrMsgLiquidity] = useState('')
  
    const [listingRate, setListingRate] = useState(0)
    const [errMsgListingRate, setErrMsgListingRate] = useState('')
    const [descListingRate, setDescListingRate] = useState('')
  
    const [startDate, setStartDate] = useState(moment(new Date()))
    const [endDate, setEndDate] = useState(moment(new Date()).add(7, "days").subtract(1, "seconds"))
    const [dateTimeRange, setDateTimeRange] = useState(`${startDate.format("YYYY-MM-DD HH:mm")} - ${endDate.format("YYYY-MM-DD HH:mm")}`)
  
    const [lockupMinutes, setLockupMinutes] = useState(0)
    const [errMsgLockupMinutes, setErrMsgLockupMinutes] = useState('')
  
    const [isCheckedVestingContributor, setIsCheckedVestingContributor] = useState(false)
  
    const [cFirstReleasePercent, setCFirstReleasePercent] = useState(0)
    const [errMsgCFirstReleasePercent, setErrMsgCFirstReleasePercent] = useState('')
  
    const [cPeriodCycle, setCPeriodCycle] = useState(0)
    const [errMsgCPeriodCycle, setErrMsgCPeriodCycle] = useState('')
  
    const [presaleTokenReleasePerCycle, setPresaleTokenReleasePerCycle] = useState(0)
    const [errMsgPresaleTokenReleasePerCycle, setErrMsgPresaleTokenReleasePerCycle] = useState('')
  
    const [isCheckedTeamVesting, setIsCheckedTeamVesting] = useState(false)
  
    const [totalTeamVestingTokens, setTotalTeamVestingTokens] = useState(0)
    const [errMsgTotalTeamVestingTokens, setErrMsgTotalTeamVestingTokens] = useState('')
  
    const [firstTokenReleaseAfterListing, setFirstTokenReleaseAfterListing] = useState(0)
  
    const [tFirstReleasePercent, setTFirstReleasePercent] = useState(0)
    const [errMsgTFirstReleasePercent, setErrMsgTFirstReleasePercent] = useState('')
  
    const [tPeriodCycle, setTPeriodCycle] = useState(0)
    const [errMsgTPeriodCycle, setErrMsgTPeriodCycle] = useState('')
  
    const [teamTokenReleasePerCycle, setTeamTokenReleasePerCycle] = useState(0)
    const [errMsgTeamTokenReleasePerCycle, setErrMsgTeamTokenReleasePerCycle] = useState('')
  
    const onChangePresaleRate = (e) => {
      setPresaleRate((v) => (e.target.validity.valid ? e.target.value : v))
    }
  
    const onChangeSoftCap = (e) => {
      setSoftCap((v) => (e.target.validity.valid ? e.target.value : v))
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
  
    const onChangeVestingContributor = (e) => {
      setIsCheckedVestingContributor(e.target.checked)
    }
  
    const onChangeCFirstReleasePercent = (e) => {
      setCFirstReleasePercent((v) => (e.target.validity.valid ? e.target.value : v))
    }
  
    const onChangeCPeriodCycle = (e) => {
      setCPeriodCycle((v) => (e.target.validity.valid ? e.target.value : v))
    }
  
    const onChangePresaleTokenReleasePerCycle = (e) => {
      setPresaleTokenReleasePerCycle((v) => (e.target.validity.valid ? e.target.value : v))
    }
  
    const onChangeTeamVesting = (e) => {
      setIsCheckedTeamVesting(e.target.checked)
    }
  
  
    const onChangeTotalTeamVestingTokens = (e) => {
      setTotalTeamVestingTokens((v) => (e.target.validity.valid ? e.target.value : v))
    }
  
    const onChangeFirstTokenReleaseAfterListing = (e) => {
      setFirstTokenReleaseAfterListing((v) => (e.target.validity.valid ? e.target.value : v))
    }
  
    const onChangeTFirstReleasePercent = (e) => {
      setTFirstReleasePercent((v) => (e.target.validity.valid ? e.target.value : v))
    }
  
    const onChangeTPeriodCycle = (e) => {
      setTPeriodCycle((v) => (e.target.validity.valid ? e.target.value : v))
    }
  
    const onChangeTeamTokenReleasePerCycle = (e) => {
      setTeamTokenReleasePerCycle((v) => (e.target.validity.valid ? e.target.value : v))
    }
  
    useEffect(() => {
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
  
      setDescListingRate('1 BNB = ' + +listingRate + ' FLASH')
  
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
  
      if (+cPeriodCycle >= 1) {
        setErrMsgCPeriodCycle('')
      } else {
        setErrMsgCPeriodCycle('Vesting period each cycle must be 1 or more')
      }
  
      if (+presaleTokenReleasePerCycle >= 1) {
        setErrMsgPresaleTokenReleasePerCycle('')
      } else {
        setErrMsgPresaleTokenReleasePerCycle('Presale token release each cycle must be 1 or more')
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
  
      if (+tPeriodCycle >= 1) {
        setErrMsgTPeriodCycle('')
      } else {
        setErrMsgTPeriodCycle('Vesting period each cycle must be 1 or more')
      }
  
      if (+teamTokenReleasePerCycle >= 1) {
        setErrMsgTeamTokenReleasePerCycle('')
      } else {
        setErrMsgTeamTokenReleasePerCycle('Team token release each cycle must be 1 or more')
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
        cPeriodCycle,
        presaleTokenReleasePerCycle,
        totalTeamVestingTokens,
        firstTokenReleaseAfterListing,
        tFirstReleasePercent,
        tPeriodCycle,
        teamTokenReleasePerCycle
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
                    <NumberInputComponent
                      title='Presale rate'
                      value={presaleRate}
                      onChange={onChangePresaleRate}
                      errMsg={errMsgPresaleRate}
                      desc='If I spend 1 BNB how many tokens will I receive?'
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
                      <p className="small-text-sz mt-1 blue-color">You can enable/disable whitelist anytime</p>
                    </div>
                    <div className='mt-3'>
                      <CRow>
                        <CCol className='col-md-6'>
                          <NumberInputComponent
                            title='SoftCap(BNB)'
                            value={softCap}
                            onChange={onChangeSoftCap}
                            errMsg={errMsgSoftCap}
                            desc='Softcap must be &ge; 50% of Hardcap!'
                          />
                        </CCol>
                        <CCol className='col-md-6'>
                          <NumberInputComponent
                            title='HardCap(BNB)'
                            value={hardCap}
                            onChange={onChangeHardCap}
                            errMsg={errMsgHardCap}
                            desc=''
                          />
                        </CCol>
                      </CRow>
                    </div>
                    <div className='mt-3'>
                      <CRow>
                        <CCol className='col-md-6'>
                          <NumberInputComponent
                            title='Minimum buy (BNB)'
                            value={minBuyBNB}
                            onChange={onChangeMinBuy}
                            errMsg={errMsgMinBuyBNB}
                            desc=''
                          />
                        </CCol>
                        <CCol className='col-md-6'>
                          <NumberInputComponent
                            title='Maximum buy (BNB)'
                            value={maxBuyBNB}
                            onChange={onChangeMaxBuy}
                            errMsg={errMsgMaxBuyBNB}
                            desc=''
                          />
                        </CCol>
                      </CRow>
                    </div>
                    <div>
                      <CRow>
                        <CCol>
                          <p className='font-bold'>Refund type</p>
                          <div>
                            <CFormSelect aria-label="Default select example">
                              <option value="burn">Burn</option>
                              <option value="refund">Refund</option>
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
                      <CRow>
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
                      <p className="small-text-sz mt-1 mb-0 blue-color">Enter the percentage of raised funds that should be allocated to Liquidity on (Min 51%, Max 100%)</p>
                      <p className="small-text-sz mt-0 blue-color">If I spend 1 BNB on how many tokens will I receive? Usually this amount is lower than presale rate to allow for a higher listing price on</p>
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
                        id="contributorCheckbox"
                        label="Using Vesting Contributor?"
                        onChange={onChangeVestingContributor} />
                    </div>
                    {
                      isCheckedVestingContributor ? (
                        <div>
                          <div className='warning-outline-box mt-3'>
                            <p className='danger' style={{ fontSize: '14px', marginTop: '7px' }}>Vesting Contributor does not support rebase tokens.</p>
                          </div>
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
                                  value={cPeriodCycle}
                                  onChange={onChangeCPeriodCycle}
                                  errMsg={errMsgCPeriodCycle}
                                  desc=''
                                  needInt
                                />
                              </CCol>
                              <CCol>
                                <NumberInputComponent
                                  title='Presale token release each cycle (percent)'
                                  value={presaleTokenReleasePerCycle}
                                  onChange={onChangePresaleTokenReleasePerCycle}
                                  errMsg={errMsgPresaleTokenReleasePerCycle}
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
  
                    <div className='mt-3'>
                      <CFormCheck
                        id="teamCheckbox"
                        label="Using Team Vesting?"
                        onChange={onChangeTeamVesting} />
                    </div>
  
                    {
                      isCheckedTeamVesting ? (
                        <div>
                          <div className='warning-outline-box mt-3'>
                            <p className='danger' style={{ fontSize: '14px', marginTop: '7px' }}>Team Vesting does not support rebase tokens.</p>
                          </div>
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
                                  value={firstTokenReleaseAfterListing}
                                  onChange={onChangeFirstTokenReleaseAfterListing}
                                  errMsg=''
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
                                  value={tPeriodCycle}
                                  onChange={onChangeTPeriodCycle}
                                  errMsg={errMsgTPeriodCycle}
                                  desc=''
                                  needInt
                                />
                              </CCol>
                              <CCol>
                                <NumberInputComponent
                                  title='Team token release each cycle (percent)'
                                  value={teamTokenReleasePerCycle}
                                  onChange={onChangeTeamTokenReleasePerCycle}
                                  errMsg={errMsgTeamTokenReleasePerCycle}
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
                      <p className='danger' style={{ textAlign: 'center' }}>Not enough balance in your wallet. Need 31.396 FLASH to create launchpad. (Your balance: 0 FLASH)</p>
                    </div>
  
                    <div className="mt-3 d-grid gap-3 d-md-flex justify-content-md-center">
                      <button type="button" className="btn-black" onClick={history.goBack}>Back</button>
                      {/* <Link to="/" style={{ textDecoration: 'none' }} className="btn-black">Back</Link> */}
                      <button type="button" className="btn-disabled">Next</button>
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
  
  export default AddAdditionalInfo
  