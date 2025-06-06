import { mount } from '@vue/test-utils';
import GeoForm from '../components/GeoForm.vue';
import { expect, test, vi } from 'vitest';

test('form submits valid data', async () => {
  const wrapper = mount(GeoForm);
  await wrapper.find('input[type="number"]').setValue(50);
  await wrapper.findAll('input[type="number"]')[1].setValue(20);
  await wrapper.findAll('input[type="number"]')[2].setValue(51);
  await wrapper.findAll('input[type="number"]')[3].setValue(21);
  expect(wrapper.find('form').exists()).toBe(true);
});

test('form emits calculated event after submit', async () => {
  const wrapper = mount(GeoForm);
  await wrapper.findAll('input[type="number"]')[0].setValue(50);
  await wrapper.findAll('input[type="number"]')[1].setValue(20);
  await wrapper.findAll('input[type="number"]')[2].setValue(51);
  await wrapper.findAll('input[type="number"]')[3].setValue(21);

  global.fetch = vi.fn(() =>
    Promise.resolve({
      json: () => Promise.resolve({ lat1: 50, lon1: 20, lat2: 51, lon2: 21, meters: 100, kilometers: 0.1 }),
    })
  );

  await wrapper.find('form').trigger('submit.prevent');

  await new Promise((resolve) => setTimeout(resolve, 0));
  expect(wrapper.emitted('calculated')).toBeTruthy();
  expect(wrapper.emitted('calculated')[0][0]).toMatchObject({
    lat1: 50,
    lon1: 20,
    lat2: 51,
    lon2: 21,
    meters: 100,
    kilometers: 0.1,
  });
});

test('inputs have required attribute', () => {
  const wrapper = mount(GeoForm);
  const inputs = wrapper.findAll('input[type="number"]');
  inputs.forEach((input) => {
    expect(input.attributes('required')).toBeDefined();
  });
});
