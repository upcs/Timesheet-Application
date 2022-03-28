/*************************************
* Testing for string hashing
* 
* Status: Test fails due to Crypto being an ES6 script, however Jest has not been natively updated for ES6
*
* Author: Tony Hayden
***********************************/

import { configure } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
import { digestStringAsync, CryptoDigestAlgorithm } from 'expo-crypto';

configure({ adapter: new Adapter() });

unhashed = "hello";
hashed = "9B71D224BD62F3785D96D46AD3EA3D73319BFBC2890CAADAE2DFF72519673CA72323C3D99BA5C11D7C7ACC6E14B8C5DA0C4663475C2E5C3ADEF46F73BCDEC043"

describe('Test SHA512 hashing', () => {
    it('test if string hashes', () => {
       test('the string is hello', async () => {
           const data = await digestStringAsync(
               CryptoDigestAlgorithm.SHA512,
               unhashed
           );
           console.log(data);
           expect(data).toBe(hashed);
       });
    });
});