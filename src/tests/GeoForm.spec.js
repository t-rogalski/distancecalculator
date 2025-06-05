import { mount } from '@vue/test-utils';
import GeoForm from '../components/GeoForm.vue';

test('form submits valid data', async () => {
  const wrapper = mount(GeoForm);
  await wrapper.find('input[type="number"]').setValue(50);
  await wrapper.findAll('input[type="number"]')[1].setValue(20);
  await wrapper.findAll('input[type="number"]')[2].setValue(51);
  await wrapper.findAll('input[type="number"]')[3].setValue(21);
  expect(wrapper.find('form').exists()).toBe(true);
});
