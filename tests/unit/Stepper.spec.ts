import Vue from 'vue'
import Vuetify from 'vuetify'
import VueRouter from 'vue-router'
import { getVuexStore } from '@/store'
import { shallowMount } from '@vue/test-utils'
import Stepper from '@/components/common/Stepper.vue'

Vue.use(Vuetify)
Vue.use(VueRouter)
const router = new VueRouter()

const vuetify = new Vuetify({})
const store = getVuexStore()

describe('Stepper component', () => {
  let wrapper: any

  beforeEach(() => {
    store.state.resourceModel.steps = [
      {
        id: 'step-1-btn',
        step: 1,
        icon: 'mdi-domain',
        text: 'Define Your \nBusiness',
        to: 'registration-define-business',
        component: 'registration-define-business'
      },
      {
        id: 'step-2-btn',
        step: 2,
        icon: 'mdi-account-multiple-plus',
        text: 'Add People \nand Roles',
        to: 'registration-people-roles',
        component: 'registration-people-roles'
      },
      {
        id: 'step-3-btn',
        step: 3,
        icon: 'mdi-text-box-check-outline',
        text: 'Review\nand Confirm',
        to: 'registration-review-confirm',
        component: 'registration-review-confirm'
      }
    ]
    store.state.stateModel.validateSteps = false
    wrapper = shallowMount(Stepper, { store, vuetify, router })
  })

  afterEach(() => {
    wrapper.destroy()
  })

  it('renders the component properly', () => {
    expect(wrapper.find('#step-buttons-container').exists()).toBe(true)
  })

  it('renders the icons properly', () => {
    wrapper = shallowMount(Stepper, { store, vuetify, router })
    const indicators = wrapper.findAll('#step-buttons-container .step__indicator')
    expect(indicators.length).toBe(3)

    const icons = wrapper.findAll('#step-buttons-container .step__indicator .step__icon')
    expect(icons.length).toBe(3)
    expect(icons.at(0).text()).toBe('mdi-domain')
    expect(icons.at(1).text()).toBe('mdi-account-multiple-plus')
    expect(icons.at(2).text()).toBe('mdi-text-box-check-outline')

    const labels = wrapper.findAll('#step-buttons-container .step__label')
    expect(labels.length).toBe(3)
    expect(labels.at(0).text()).toBe('Define Your \nBusiness')
    expect(labels.at(1).text()).toBe('Add People \nand Roles')
    expect(labels.at(2).text()).toBe('Review\nand Confirm')
  })
})
