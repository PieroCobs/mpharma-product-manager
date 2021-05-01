import App from 'next/app'
import { Fragment } from 'react';

// import Feedback from "../src/views/components/globals/Feedback";



class mPharmaProductManagerApp extends App {
   static async getInitialProps({ Component, ctx }) {
      let pageProps = {};
      if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
      return { pageProps }
   }

   render() {
      const { Component, pageProps, router } = this.props;

      return (
         <Fragment>
				{/* <Feedback/> */}
				<Component
					{...pageProps}
					pathname={router.pathname}
					query={router.query}
				/>
			</Fragment>
      )
   }
}



export default mPharmaProductManagerApp;