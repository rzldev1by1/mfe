import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Logo from 'assets/img/login-logo.png';
import loading from '../../assets/icons/loading/LOADING-MLS.gif';
import './Login.css';

const baseUrl = process.env.REACT_APP_API_URL;
const version = process.env.REACT_APP_VERSION || '';
class Logins extends Component {
  constructor(props) {
    super(props);
    this.state = {
      formValidation: {
        username: true,
        password: true,
      },
      emailValidation: true,
      errorMessage: '',
      isLoad: false,
      forgotPassword: false,
      policy: false,
      forgotSuccess: false,
      emailValue: '',
    };
  }

  componentDidMount() {
    const { expired, user } = this.props.store;
    if (expired && user)
      this.setState({ errorMessage: 'Sorry, you have been automatically logged out due to inactivity' });
  }

  validateForm = async (e) => {
    e.preventDefault();
    let errorMessage = '';
    if (!this.state.forgotPassword) {
      this.setState({ isLoad: true });
      const username = e.target.username.value;
      const password = e.target.password.value;
      if (username && password) {
        const payload = { userid: username, password: password };
        // const result = await helpers.authenticationHandler(payload)
        try {
          const { data } = await axios.post(baseUrl + '/auth/login', payload);
          console.log(data);
          if (data) {
            this.setState({ errorMessage: null });

            let dataUser = { ...data?.user };
            dataUser.token = data.access_token;
            this.props.dispatch({ type: 'LOGIN', data: dataUser });
            this.props.history.push('/');
          }
        } catch (error) {
          errorMessage = 'Failed to process your request';
          if (error.response) {
            errorMessage = error.response.status
              ? 'Username or password is not valid'
              : 'Failed to process your request';
          }
        }
        this.setState({ isLoad: false, errorMessage, formValidation: { username: true, password: true } });
      } else {
        let formValidation = {
          username: username.length ? true : false,
          password: password.length ? true : false,
        };
        if (!password) {
          errorMessage = 'Password is required';
        }
        if (!username) {
          errorMessage = 'Username is required';
        }
        if (!username && !password) {
          errorMessage = 'Username and Password are required';
        }
        this.setState({ isLoad: false, formValidation, errorMessage });
      }
    }

    if (this.state.forgotPassword) {
      const email = e.target.email.value;
      const payload = { email: email };
      let errorMessage = '';
      if (email.length === 0) {
        this.setState({ emailValidation: false, isLoad: false });
      }
      this.setState({ isLoad: true });
      try {
        const result = await axios.post(baseUrl + '/usermanagement/request_reset_password', payload);
        if (result.status === 400) {
          this.setState({ isLoad: false, errorMessage: result.message, emailValidation: false });
        } else {
          this.hideErrorMessageHandler(errorMessage);
          this.setState({ forgotSuccess: true });
        }
      } catch (error) {
        const errorMessage = error.response.data.message;
        this.setState({ isLoad: false, errorMessage });
      }
    }
  };

  changeFormHanlder = () => {
    this.setState({
      forgotPassword: !this.state.forgotPassword,
      errorMessage: '',
      formValidation: { username: true, password: true },
      emailValidation: true,
    });
  };

  changePolicyHandler = () => {
    this.setState({ policy: true, forgotPassword: false });
  };

  changeTermHandler = () => {
    this.setState({ policy: true, forgotPassword: true });
  };

  exitPolicyHandler = () => {
    this.setState({ policy: false, forgotPassword: false, forgotSuccess: false });
  };

  redirectPageHandler = () => {
    window.location.replace(window.location.origin);
  };

  hideErrorMessageHandler = (errorMessage) => {
    this.setState({ isLoad: false, errorMessage, emailValidation: true });
  };

  onChangeEmail = (e) => {
    this.setState({ emailValue: e.target.value });
  };

  loginForm(errorMessage, formValidation) {
    return (
      <form
        className={'mt-3 ' + (this.state.forgotPassword ? 'form-hidden' : 'form-show')}
        onSubmit={this.validateForm}
      >
        <input
          autoComplete="off"
          className={'form-control  inputLogin ' + (formValidation.username ? 'ssss' : 'border-red') /*"is-invalid"*/}
          style={formValidation.username ? {} : { borderColor: '#f44336 !important' }}
          type="text"
          name="username"
          placeholder="Enter your user ID here"
        />
        <br />
        <input
          autoComplete="off"
          className={'form-control inputLogin ' + (formValidation.password ? '' : '') /*"is-invalid"*/}
          type="password"
          name="password"
          placeholder="Enter your password here"
        />
        <div className={'error ' + (errorMessage ? ' alertFadeIn' : '')}>
          {errorMessage && (
            <div>
              <span className="iconU-i" /> {errorMessage}
            </div>
          )}
        </div>
        <div className="row">
          <div className="pl-3 pr-0" style={{ width: '30%' }}>
            <button type="submit" className="btn btn-primary btn-login col-12">
              {this.state.isLoad ? <img src={loading} alt="" className="mt-min-5" width="45" height="45" /> : 'LOGIN'}
            </button>
          </div>
          <div className="col-7 mt-3">
            <span className="form-login-change" onClick={() => this.changeFormHanlder()}>
              FORGOT PASSWORD
            </span>
          </div>
        </div>
      </form>
    );
  }

  forgotPasswordForm(errorMessage, formValidation) {
    return (
      <form
        className={'mt-3 ' + (this.state.forgotPassword ? 'form-show' : 'form-hidden')}
        onSubmit={this.validateForm}
      >
        {this.state.forgotSuccess ? (
          <div className="col-10" style={{ marginTop: '17px' }}>
            <div className="forgotPassMsg" style={{ color: '#4775ff' }}>
              Password recovery link has been sent to your email address
            </div>
            <div className="forgotPassMsg">{this.state.emailValue}</div>
          </div>
        ) : (
          <div>
            <input
              autoComplete="off"
              onChange={this.onChangeEmail}
              className={'form-control  inputLogin ' + (this.state.emailValidation ? '' : '') /*"is-invalid"*/}
              type="text"
              name="email"
              placeholder="Enter your email address here"
            />
            <span className="email-message">Enter your email address to find your acccount</span>
          </div>
        )}
        <div className={'error pl-2 ml-1' + (errorMessage ? ' alertFadeIn' : '')}>
          {errorMessage && (
            <div>
              <span className="iconU-i" /> {errorMessage}
            </div>
          )}
        </div>
        <div className="row forgot-row">
          {this.state.forgotSuccess ? (
            <div className="pr-0 pl-3 white-space" style={{ width: '30%' }}>
              <button
                onClick={() => this.exitPolicyHandler()}
                type="button"
                className="btn btn-primary btn-login col-12"
              >
                {this.state.isLoad ? <img src={loading} alt="" className="mt-min-5" width="45" height="45" /> : 'BACK'}
              </button>
            </div>
          ) : (
            <div className="pr-0 pl-3 white-space" style={{ width: '30%' }}>
              <button type="submit" className="btn btn-primary btn-login col-12">
                {this.state.isLoad ? <img src={loading} alt="" className="mt-min-5" width="45" height="45" /> : 'SEND'}
              </button>
            </div>
          )}
          {this.state.forgotSuccess ? null : (
            <div className="col-sm-8 mt-3">
              <span className="form-login-change" onClick={() => this.changeFormHanlder()}>
                LOGIN PAGE
              </span>
            </div>
          )}
        </div>
      </form>
    );
  }

  termAndCondition() {
    return (
      <div className="privacy-and-term mb-3">
        <div className="policy-title policyContent">Terms and Conditions</div>
        <div className="form-control text-area-policy policyContent">
          Your privacy on microlistics.com <br />
          <br />
          This website is administered by Microlistics. The primary purpose of Microlistics.com is to be a dynamic
          resource and business tool to help you create your future. We want you to feel secure when visiting our site
          and are committed to maintaining your privacy when doing so. The following provides an overview of how we
          protect your privacy during your visit.
          <br />
          <br />
          Microlistics recognizes the importance of data privacy and considers it crucial to apply the highest standards
          of data privacy at all times.
          <br />
          <br />
          As a member of the WiseTech Global Limited (WTG) Group, Microlistics adheres to the WTG Data Privacy Policy
          (the Policy).
          <br />
          <br />
          Should you have any questions in relation to the Policy or its application, please
          contact: privacyofficer@wisetechglobal.com
          <br />
          <br />
          Introduction
          <br />
          <br />
          Microlistics and its related bodies corporate (Microlistics, we, our, us) recognize the importance of
          protecting the privacy and the rights of individuals in relation to their personal information.
          <br />
          This document is our privacy policy and it tells you how we collect, manage, and disclose your personal
          information. What is personal information?
          <br />
          When used in this privacy policy, the term “personal information” has the meaning given to it in Australia’s
          Privacy Act 1988 (the Privacy Act) and Europe’s General Data Protection Regulation (the GDPR). In general
          terms, it is any information that can be used to personally identify you. This may include your name, address,
          telephone number, email address, and profession or occupation. If the information we collect personally
          identifies you, or you are reasonably identifiable from it, the information will be considered personal
          information.
          <br />
          What personal information may we collect?
          <br />
          To the extent legally permissible in your jurisdiction, we may collect the following types of personal
          information:
          <br />
          name;
          <br />
          mail, email, and street addresses;
          <br />
          telephone and facsimile numbers;
          <br />
          profession, occupation, job title, and work history;
          <br />
          bank details;
          <br />
          photos and videos;
          <br />
          details of the products and services you have purchased from us, or which you have enquired about, together
          with any additional information necessary to deliver those products and services, respond to your enquiries
          and generally to complete any commercial transaction between you and us;
          <br />
          any additional information relating to you that you provide to us directly through our websites or indirectly
          through use of our websites or online presence, through our representatives or otherwise; and
          <br />
          information you provide to us through our service center, customer surveys and/or visits by, or telephone
          calls from, our representatives from time to time.
          <br />
          We do not ordinarily collect sensitive information as defined in the Privacy Act or the GDPR.
          <br />
          We may also collect some information that is not personal information because it does not identify you or
          anyone else. For example, we may collect anonymous answers to surveys or aggregated information about how
          users use our website.
          <br />
          How do we collect personal information?
          <br />
          To the extent legally permissible in your jurisdiction, Microlistics collects personal information in a number
          of ways, including: directly from you, such as when you provide information by phone or in documents such as
          an application form; from third parties such as our related companies, credit reporting agencies, or your
          representatives; from publicly available sources of information; from the organizations identified below under
          “When we disclose your personal information”; and from our own records of how you use Microlistics services.
          How do we use your personal information? To the extent legally permissible in your jurisdiction, we collect,
          hold, use, and disclose your personal information for purposes including to: identify you; provide the
          products and services you require; administer and manage those products and services, including charging,
          billing, and collecting debts; inform you of ways the products and services provided to you could be improved;
          research and develop our products and services; perform our business activities and functions; provide you
          with customer service; maintain and develop our business systems and infrastructure, including testing and
          upgrading of these systems; send communications requested by you; answer your enquiries and provide
          information or advice about existing and new products or services; provide you with access to protected areas
          of our website; assess the performance of our website and improve the operation of our website; fulfil the
          administrative, planning, quality control, and research purposes of Microlistics, its related bodies
          corporate, contractors, and/or suppliers; update our records and keep your contact details up to date; provide
          your updated personal information to our related bodies corporate, contractors, and/or suppliers; process and
          respond to any complaint made by you; contact you and/or pay you for (or in connection with) products or
          services you provide us; and comply with, or act in accordance with, any law, rule, regulation, lawful and
          binding determination, decision or direction of a regulator, or in cooperation with any governmental authority
          of any country (or political subdivision of a country). To the extent legally permissible in your
          jurisdiction, we also collect, hold, use and disclose your personal information to promote and market to you
          other services that we consider may be of interest to you, including through direct marketing and targeted
          online advertising. To the extent this is legally permissible in your jurisdiction, you consent to receive
          such marketing communications by using our products, services, or website, or by providing us with your
          personal information. We will provide you with an opportunity to unsubscribe from any future promotional or
          marketing material (such as promotional email offers) and educational material via an opt-out mechanism. You
          may also notify us at any time that you do not wish to receive marketing or promotional material by advising
          the WTG Privacy Officer at the contact details set out below under “Your rights.” Cookie usage Cookies are
          small files which are stored on a user’s computer. They are designed to hold a modest amount of data specific
          to a particular client and website.  They can be accessed either by the web server or the client computer. We
          use cookies to understand and save your preferences for future visits and compile aggregate data about site
          traffic and site interaction so that we can offer better site experiences and tools in the future. We may
          contract third-party service providers to assist us in better understanding our site visitors. These service
          providers are not permitted to use the information collected on our behalf except to help us conduct and
          improve our business. We also use remarketing tools such as Google Adwords and Analytics to display
          content-specific advertisements to visitors who have previously visited our site when those visitors go to
          other websites that have implemented the Google Display Network. Microlistics and other third-party vendors,
          including Google, use first-party cookies (such as the Google Analytics cookie) and third-party cookies (such
          as the DoubleClick cookie) together to inform, optimize, and serve ads based on visitors’ past visits to our
          website. To opt out of a third-party vendor’s use of cookies visit the Network Advertising
          Initiative’s consumer opt-out page. All About Cookies has instructions for how to manage your cookie settings.
          When we disclose your personal information For the purposes set out above (under “How do we use your personal
          information”) we may disclose your personal information to organizations or persons outside Microlistics, to
          the extent this is legally permissible in your jurisdiction. If we need to disclose your personal information
          for any other purpose, we will only do so with your consent or—if this is legally permissible in your
          jurisdiction—where you may otherwise reasonably expect us to do so. Where appropriate, these disclosures are
          subject to privacy and confidentiality protections and—as the case may be—other requirements under the GDPR.
          The organizations and persons to which we usually disclose information include: outsourced service providers
          who manage the services we provide to you, including billing and debt-recovery functions; information
          technology service providers; installation, maintenance, and repair service providers; your representatives
          (e.g. your authorized representatives or legal advisers); credit reporting and fraud checking agencies; our
          professional advisers, including our accountants, auditors, and lawyers; government and regulatory authorities
          and other organizations, as required or authorized by law; and our related companies. Some of these
          organizations or persons may be located in other countries. The countries in which these organizations or
          persons are located will vary, but, in the course of our ordinary operations, we generally disclose personal
          information to organizations or persons located in Australia, the United States of America and the United
          Kingdom. How do we keep your personal information secure? We keep your personal information secure by
          implementing physical and electronic security systems, limiting who can access your personal information, and
          training our staff to keep your information safe and secure. We also have online and network security systems
          in place so that the information you provide us with is protected and secure. Your rights Under the Privacy
          Act and subject to its terms, you are entitled to: access your personal information; and seek the correction
          of your personal information. Under the GDPR, you are (among other things) entitled to: receive transparent
          information regarding the processing of your personal data; access your personal data, including the right to
          obtain free of charge a copy of the personal data undergoing processing in a commonly available electronic
          format; rectification of incorrect personal data and completion of incomplete personal data; erasure of your
          personal data, including the “right to be forgotten”; restrict the processing of your personal data; your data
          being portable and accessible upon request; and object to the processing of your personal data. If you wish to
          exercise any of the above rights or if you have any questions about this privacy policy, any concerns or a
          complaint regarding the treatment of your privacy, or a possible breach of your privacy, please use the
          contact link on our website or contact our Privacy Officer at: Email: privacyofficer@wisetechglobal.com Post:
          Unit 3a, 72 O’Riordan Street, Alexandria NSW 2015 Australia. If you do make a complaint or allege a breach,
          WTG will investigate your complaint and use reasonable endeavours to respond to you in writing within 28 days
          of receiving the written complaint. If we fail to respond to your complaint within 28 days of receiving it in
          writing, or if you are dissatisfied with the response that you receive from us, you have the right, depending
          on the jurisdiction, to make a complaint to the applicable regulator. In the case of the Privacy Act, the
          applicable regulator is the Office of the Australian Information Commissioner. In the case of the GDPR, the
          applicable regulator will be the local regulator in your jurisdiction in Europe. Changes to our privacy policy
          We operate in a dynamic business and technological environment. Over time, aspects of our business or
          technology may change as we respond to changing market and technological conditions. This may require our
          policies to be reviewed and revised. We reserve the right to change this privacy policy at any time and to
          notify you by posting an updated version of the policy on our website. If at any point we decide to use
          personal information in a manner materially different from that stated at the time it was collected, we will
          notify users by email or via a prominent notice on our website and, where necessary, we will seek the prior
          consent of our users. To learn more about our data collection policy please click here.
        </div>

        <div className="row mt-3">
          <div className="pl-3 pr-0" style={{ width: '30%' }}>
            <button onClick={() => this.exitPolicyHandler()} type="button" className="btn btn-primary btn-login col-12">
              {this.state.isLoad ? <img src={loading} alt="" className="mt-min-5" width="45" height="45" /> : 'BACK'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  privacyAndPolicy() {
    return (
      <div className="privacy-and-term mb-3">
        {/* <div className='policy-title inputLogin'>PRIVACY AND POLICY</div> */}
        {/* <div className='form-control text-area-policy inputLogin'> GDPR privacy policy requirements
                Article 12 of the GDPR requires that you communicate information about your processing of personal data in a way that is:

                concise
                transparent
                in clear and plain language
                intelligible
                easily accessible
                free of charge
                In general, most privacy laws require you to inform your users about the following:

                Your name (or business name), location, and contact information
                What information you’re collecting from them (including names, email addresses, IP addresses, and any other information)
                What methods you are using to collect their information, e.g. cookies
                The purpose for collecting this information
                How you’re keeping their information safe
                Whether or not it’s optional for them to share that information, how they can opt-out, and the consequences of doing so
                Any third-party services you’re using to collect, process, or store that information (such as an e-mail newsletter service, or advertising network)
                Following a GDPR privacy policy templates like the above can be a help on the way, but using a GDPR
                privacy policy generator (as we link to below) can be dangerous.
                You must be mindful of getting all of the relevant and required information about your website into your GDPR privacy policy.
                </div> */}
        <div className="policy-title policyContent">Privacy Policy</div>
        <div className="form-control text-area-policy policyContent">
          Your privacy on microlistics.com <br />
          <br />
          This website is administered by Microlistics. The primary purpose of Microlistics.com is to be a dynamic
          resource and business tool to help you create your future. We want you to feel secure when visiting our site
          and are committed to maintaining your privacy when doing so. The following provides an overview of how we
          protect your privacy during your visit.
          <br />
          <br />
          Microlistics recognizes the importance of data privacy and considers it crucial to apply the highest standards
          of data privacy at all times.
          <br />
          <br />
          As a member of the WiseTech Global Limited (WTG) Group, Microlistics adheres to the WTG Data Privacy Policy
          (the Policy).
          <br />
          Should you have any questions in relation to the Policy or its application, please
          contact: privacyofficer@wisetechglobal.com
          <br />
          <br />
          Introduction
          <br />
          <br />
          Microlistics and its related bodies corporate (Microlistics, we, our, us) recognize the importance of
          protecting the privacy and the rights of individuals in relation to their personal information.
          <br />
          <br />
          This document is our privacy policy and it tells you how we collect, manage, and disclose your personal
          information. What is personal information?
          <br />
          <br />
          When used in this privacy policy, the term “personal information” has the meaning given to it in Australia’s
          Privacy Act 1988 (the Privacy Act) and Europe’s General Data Protection Regulation (the GDPR). In general
          terms, it is any information that can be used to personally identify you. This may include your name, address,
          telephone number, email address, and profession or occupation. If the information we collect personally
          identifies you, or you are reasonably identifiable from it, the information will be considered personal
          information.
          <br />
          What personal information may we collect?
          <br />
          <br />
          To the extent legally permissible in your jurisdiction, we may collect the following types of personal
          information:
          <br />
          name;
          <br />
          mail, email, and street addresses;
          <br />
          telephone and facsimile numbers;
          <br />
          profession, occupation, job title, and work history;
          <br />
          bank details;
          <br />
          photos and videos;
          <br />
          details of the products and services you have purchased from us, or which you have enquired about, together
          with any additional information necessary to deliver those products and services, respond to your enquiries
          and generally to complete any commercial transaction between you and us;
          <br />
          any additional information relating to you that you provide to us directly through our websites or indirectly
          through use of our websites or online presence, through our representatives or otherwise; and
          <br />
          information you provide to us through our service center, customer surveys and/or visits by, or telephone
          calls from, our representatives from time to time.
          <br />
          We do not ordinarily collect sensitive information as defined in the Privacy Act or the GDPR.
          <br />
          We may also collect some information that is not personal information because it does not identify you or
          anyone else. For example, we may collect anonymous answers to surveys or aggregated information about how
          users use our website.
          <br />
          How do we collect personal information?
          <br />
          To the extent legally permissible in your jurisdiction, Microlistics collects personal information in a number
          of ways, including: directly from you, such as when you provide information by phone or in documents such as
          an application form; from third parties such as our related companies, credit reporting agencies, or your
          representatives; from publicly available sources of information; from the organizations identified below under
          “When we disclose your personal information”; and from our own records of how you use Microlistics services.
          How do we use your personal information? To the extent legally permissible in your jurisdiction, we collect,
          hold, use, and disclose your personal information for purposes including to: identify you; provide the
          products and services you require; administer and manage those products and services, including charging,
          billing, and collecting debts; inform you of ways the products and services provided to you could be improved;
          research and develop our products and services; perform our business activities and functions; provide you
          with customer service; maintain and develop our business systems and infrastructure, including testing and
          upgrading of these systems; send communications requested by you; answer your enquiries and provide
          information or advice about existing and new products or services; provide you with access to protected areas
          of our website; assess the performance of our website and improve the operation of our website; fulfil the
          administrative, planning, quality control, and research purposes of Microlistics, its related bodies
          corporate, contractors, and/or suppliers; update our records and keep your contact details up to date; provide
          your updated personal information to our related bodies corporate, contractors, and/or suppliers; process and
          respond to any complaint made by you; contact you and/or pay you for (or in connection with) products or
          services you provide us; and comply with, or act in accordance with, any law, rule, regulation, lawful and
          binding determination, decision or direction of a regulator, or in cooperation with any governmental authority
          of any country (or political subdivision of a country). To the extent legally permissible in your
          jurisdiction, we also collect, hold, use and disclose your personal information to promote and market to you
          other services that we consider may be of interest to you, including through direct marketing and targeted
          online advertising. To the extent this is legally permissible in your jurisdiction, you consent to receive
          such marketing communications by using our products, services, or website, or by providing us with your
          personal information. We will provide you with an opportunity to unsubscribe from any future promotional or
          marketing material (such as promotional email offers) and educational material via an opt-out mechanism. You
          may also notify us at any time that you do not wish to receive marketing or promotional material by advising
          the WTG Privacy Officer at the contact details set out below under “Your rights.” Cookie usage Cookies are
          small files which are stored on a user’s computer. They are designed to hold a modest amount of data specific
          to a particular client and website.  They can be accessed either by the web server or the client computer. We
          use cookies to understand and save your preferences for future visits and compile aggregate data about site
          traffic and site interaction so that we can offer better site experiences and tools in the future. We may
          contract third-party service providers to assist us in better understanding our site visitors. These service
          providers are not permitted to use the information collected on our behalf except to help us conduct and
          improve our business. We also use remarketing tools such as Google Adwords and Analytics to display
          content-specific advertisements to visitors who have previously visited our site when those visitors go to
          other websites that have implemented the Google Display Network. Microlistics and other third-party vendors,
          including Google, use first-party cookies (such as the Google Analytics cookie) and third-party cookies (such
          as the DoubleClick cookie) together to inform, optimize, and serve ads based on visitors’ past visits to our
          website. To opt out of a third-party vendor’s use of cookies visit the Network Advertising
          Initiative’s consumer opt-out page. All About Cookies has instructions for how to manage your cookie settings.
          When we disclose your personal information For the purposes set out above (under “How do we use your personal
          information”) we may disclose your personal information to organizations or persons outside Microlistics, to
          the extent this is legally permissible in your jurisdiction. If we need to disclose your personal information
          for any other purpose, we will only do so with your consent or—if this is legally permissible in your
          jurisdiction—where you may otherwise reasonably expect us to do so. Where appropriate, these disclosures are
          subject to privacy and confidentiality protections and—as the case may be—other requirements under the GDPR.
          The organizations and persons to which we usually disclose information include: outsourced service providers
          who manage the services we provide to you, including billing and debt-recovery functions; information
          technology service providers; installation, maintenance, and repair service providers; your representatives
          (e.g. your authorized representatives or legal advisers); credit reporting and fraud checking agencies; our
          professional advisers, including our accountants, auditors, and lawyers; government and regulatory authorities
          and other organizations, as required or authorized by law; and our related companies. Some of these
          organizations or persons may be located in other countries. The countries in which these organizations or
          persons are located will vary, but, in the course of our ordinary operations, we generally disclose personal
          information to organizations or persons located in Australia, the United States of America and the United
          Kingdom. How do we keep your personal information secure? We keep your personal information secure by
          implementing physical and electronic security systems, limiting who can access your personal information, and
          training our staff to keep your information safe and secure. We also have online and network security systems
          in place so that the information you provide us with is protected and secure. Your rights Under the Privacy
          Act and subject to its terms, you are entitled to: access your personal information; and seek the correction
          of your personal information. Under the GDPR, you are (among other things) entitled to: receive transparent
          information regarding the processing of your personal data; access your personal data, including the right to
          obtain free of charge a copy of the personal data undergoing processing in a commonly available electronic
          format; rectification of incorrect personal data and completion of incomplete personal data; erasure of your
          personal data, including the “right to be forgotten”; restrict the processing of your personal data; your data
          being portable and accessible upon request; and object to the processing of your personal data. If you wish to
          exercise any of the above rights or if you have any questions about this privacy policy, any concerns or a
          complaint regarding the treatment of your privacy, or a possible breach of your privacy, please use the
          contact link on our website or contact our Privacy Officer at: Email: privacyofficer@wisetechglobal.com Post:
          Unit 3a, 72 O’Riordan Street, Alexandria NSW 2015 Australia. If you do make a complaint or allege a breach,
          WTG will investigate your complaint and use reasonable endeavours to respond to you in writing within 28 days
          of receiving the written complaint. If we fail to respond to your complaint within 28 days of receiving it in
          writing, or if you are dissatisfied with the response that you receive from us, you have the right, depending
          on the jurisdiction, to make a complaint to the applicable regulator. In the case of the Privacy Act, the
          applicable regulator is the Office of the Australian Information Commissioner. In the case of the GDPR, the
          applicable regulator will be the local regulator in your jurisdiction in Europe. Changes to our privacy policy
          We operate in a dynamic business and technological environment. Over time, aspects of our business or
          technology may change as we respond to changing market and technological conditions. This may require our
          policies to be reviewed and revised. We reserve the right to change this privacy policy at any time and to
          notify you by posting an updated version of the policy on our website. If at any point we decide to use
          personal information in a manner materially different from that stated at the time it was collected, we will
          notify users by email or via a prominent notice on our website and, where necessary, we will seek the prior
          consent of our users. To learn more about our data collection policy please click here.
        </div>

        <div className="row mt-3">
          <div className="pl-3 pr-0" style={{ width: '30%' }}>
            <button onClick={() => this.exitPolicyHandler()} type="button" className="btn btn-primary btn-login col-12">
              {this.state.isLoad ? <img src={loading} alt="" className="mt-min-5" width="45" height="45" /> : 'BACK'}
            </button>
          </div>
        </div>
      </div>
    );
  }

  render() {
    const { errorMessage, formValidation, forgotPassword, policy } = this.state;
    let formComponent = this.loginForm(errorMessage, formValidation);
    if (forgotPassword && !policy) formComponent = this.forgotPasswordForm(errorMessage, formValidation);
    if (!forgotPassword && !policy) formComponent = this.loginForm(errorMessage, formValidation);
    if (!forgotPassword && policy) formComponent = this.privacyAndPolicy();
    if (forgotPassword && policy) formComponent = this.termAndCondition();
    return (
      <div className="login">
        <div className="container-fluid">
          <div className="card col-md-8 col-lg-4 offset-md-1">
            <div className="card-body login-card">
              <img src={Logo} className="logo mb-2" alt="mlslogo" />
              {formComponent}
              <div className="links mt-3">
                <span onClick={() => this.changePolicyHandler()} className="term-and-condition">
                  Privacy and Policy
                </span>
                <span> &nbsp; | &nbsp; </span>
                <span onClick={() => this.changeTermHandler()} className="term-and-condition">
                  Terms and Conditions
                </span>
              </div>
            </div>
          </div>
          <div className="offset-md-1 mt-5">
            <a className="text-white " target="blank" href="https://www.microlistics.com.au/">
              © Microlistics {new Date().getFullYear()} - part of the WiseTech Global Group
            </a>
          </div>
          <div className="offset-md-1 mb-4">
            <span className="text-logo">{version}</span>
          </div>
          <br />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (store) => ({ store });
const mapDispatchToProps = (dispatch) => ({ dispatch });
export default connect(mapStateToProps, mapDispatchToProps)(Logins);
