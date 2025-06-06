import { mount } from '@vue/test-utils';
import App from '../App.vue';
import { expect, test, vi } from 'vitest';

vi.mock('../components/MapDisplay.vue', () => ({
  default: {
    name: 'MapDisplay',
    template: '<div />',
  },
}));

test('add shifted class to .container', async () => {
  const wrapper = mount(App);

  await wrapper.vm.handleCalculated({
    lat1: 1,
    lon1: 1,
    lat2: 2,
    lon2: 2,
    kilometers: 1,
    meters: 1000,
  });
  await wrapper.vm.$nextTick();

  const button = wrapper.findComponent({ name: 'ResultDisplay' }).find('button');
  await button.trigger('click');

  expect(wrapper.find('.container').classes()).toContain('shifted');
});
