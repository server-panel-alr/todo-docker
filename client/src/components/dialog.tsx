import { useTranslation } from 'react-i18next';
import { animated, easings, useTransition } from 'react-spring';
import { DialogType } from '../constants';
import { useDialog } from '../hooks/use-dialog';
import { Button } from './button';

const Dialog = () => {
  const { t } = useTranslation();
  const { getAll, close } = useDialog();
  const dialogs = getAll();

  const transitions = useTransition(dialogs, {
    from: {
      opacity: 0,
      translateY: 8,
      scale: 0.95,
      config: { duration: 200, easing: easings.easeInSine },
    },
    enter: {
      opacity: 1,
      translateY: 0,
      scale: 1,
      config: { duration: 300, easing: easings.easeOutSine },
    },
    leave: {
      opacity: 0,
      translateY: 8,
      scale: 0.95,
      config: { duration: 200, easing: easings.easeInSine },
    },
  });

  return transitions((style, dialog, transition, index) =>
    dialog ? (
      <div className='relative z-10'>
        {index === 0 ? (
          <animated.div
            style={{ opacity: style.opacity }}
            className='fixed inset-0 bg-gray-500 bg-opacity-75'
          />
        ) : null}

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <animated.div
            style={style}
            className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'
          >
            <div className='relative overflow-hidden rounded-lg bg-white text-left shadow-xl sm:my-8 sm:w-full sm:max-w-lg'>
              <div className='bg-white px-4 pt-5 pb-4 sm:flex sm:items-start sm:p-6 sm:pb-4'>
                <div className='mt-3 w-full text-center sm:mt-0 sm:text-left'>
                  <>{dialog.element}</>
                </div>
              </div>
              {dialog.type !== DialogType.CUSTOM ? (
                <div className='w-full bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6'>
                  <div className='sm:ml-2'>
                    <Button
                      color={
                        dialog.type === DialogType.INFO
                          ? 'blue'
                          : dialog.type === DialogType.WARN
                          ? 'red'
                          : 'default'
                      }
                      onClick={() => {
                        dialog.actions?.confirm?.onClick?.({
                          type: dialog.type,
                          element: dialog.element,
                          closeDialog: () => close(dialog),
                        });
                        if (
                          dialog.autoCloseAfterAction ||
                          !dialog.actions?.confirm
                        )
                          close(dialog);
                      }}
                    >
                      {dialog.actions?.confirm?.label ?? t('action.confirm')}
                    </Button>
                  </div>
                  <div className='mt-2 sm:mt-0'>
                    <Button
                      color='default'
                      onClick={() => {
                        dialog.actions?.cancel?.onClick?.({
                          type: dialog.type,
                          element: dialog.element,
                          closeDialog: () => close(dialog),
                        });
                        if (
                          dialog.autoCloseAfterAction ||
                          !dialog.actions?.cancel
                        )
                          close(dialog);
                      }}
                    >
                      {dialog.actions?.cancel?.label ?? t('action.cancel')}
                    </Button>
                  </div>
                </div>
              ) : null}
            </div>
          </animated.div>
        </div>
      </div>
    ) : null,
  );
};

export { Dialog };
