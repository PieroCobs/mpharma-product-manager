import App from 'next/app'
import { Provider } from 'react-redux'
import { createStore } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import reducers from '../src/services/reducers'
import Feedback from "../src/views/globals/Feedback";


export const store = createStore(
	reducers, 
	composeWithDevTools()
);


class mPharmaProductManagerApp extends App {
   // static async getInitialProps({ Component, ctx }) {
   //    let pageProps = {};
   //    if (Component.getInitialProps) pageProps = await Component.getInitialProps(ctx);
   //    return { pageProps }
   // }

   render() {
      const { Component, pageProps, router } = this.props;

      return (
         <Provider store={store}>
				<Feedback/>
				<Component
					{...pageProps}
					pathname={router.pathname}
					query={router.query}
				/>
          </Provider>
      )
   }
}


export default mPharmaProductManagerApp;