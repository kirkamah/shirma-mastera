// Trial-build helpers. __TRIAL__ is a compile-time constant (see
// electron.vite.config.ts); in the full build every branch guarded by
// IS_TRIAL is statically false and gets dropped by the bundler.
import i18n from 'i18next'
import { confirmDialog } from './store/dialog'

export const IS_TRIAL = __TRIAL__

/** Max user-created entries per area (monsters / characters / builds) in trial. */
export const TRIAL_LIMIT = 3

export const BOOSTY_URL = 'https://boosty.to/no.harm.org'

/** Opens Boosty in the system browser (main intercepts window.open via
 *  setWindowOpenHandler → shell.openExternal). */
export function openBoosty(): void {
  window.open(BOOSTY_URL, '_blank')
}

/** «Limit reached» dialog with a clickable Boosty button. */
export async function showTrialLimitDialog(): Promise<void> {
  const go = await confirmDialog({
    title: i18n.t('trial.limitTitle'),
    message: i18n.t('trial.limitMessage', { n: TRIAL_LIMIT }),
    confirmText: i18n.t('trial.goBoosty'),
    cancelText: i18n.t('trial.close')
  })
  if (go) openBoosty()
}
