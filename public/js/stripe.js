/* eslint-disable */
import axios from 'axios';
import { showAlert } from './alerts';
const stripe = Stripe(
  'pk_test_51JCKmjSFIDKEa2Y6rVXsbPLVizxcyUMXuZidF0SSCNabCRNwtoeR43CANL0AvVhcE5lEdXz16wtbpf4isjS8RyRw00gkUm8wmx'
);

export const bookTour = async (tourId) => {
  try {
    // 1) Get checkout session from API
    // console.log(tourId);
    const session = await axios(`/api/v1/bookings/checkout-session/${tourId}`);
    // console.log(session);

    // 2) Create checkout form + chanre credit card
    await stripe.redirectToCheckout({
      sessionId: session.data.session.id,
    });
  } catch (err) {
    // console.log(err);
    showAlert('error', err);
  }
};
