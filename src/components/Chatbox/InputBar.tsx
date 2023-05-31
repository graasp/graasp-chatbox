import { FC, useEffect, useRef, useState } from 'react';

import { MessageBodyType } from '@graasp/sdk';

import { useEditingContext } from '../../context/EditingContext';
import { useMessagesContext } from '../../context/MessagesContext';
import { EditMessageFunctionType, SendMessageFunctionType } from '../../types';
import FullWidthWrapper from '../common/FullWidthWrapper';
import EditBanner from './EditBanner';
import Input from './Input';

type Props = {
  sendMessageBoxId?: string;
  sendMessageFunction?: SendMessageFunctionType;
  editMessageFunction?: EditMessageFunctionType;
};

const InputBar: FC<Props> = ({
  sendMessageBoxId,
  sendMessageFunction,
  editMessageFunction,
}) => {
  const { open, body, messageId, cancelEdit } = useEditingContext();
  const [textInput, setTextInput] = useState(open ? body : '');
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { chatId } = useMessagesContext();

  useEffect(() => {
    // when in editing mode, seed the textfield with the old message body
    setTextInput(open ? body : '');
    // focus the input field
    if (open) {
      inputRef.current?.focus();
    }
  }, [open, messageId]);

  const handleOnCloseEditingBanner = (): void => {
    cancelEdit();
    setTextInput('');
  };

  const handleSendMessageFunction = (body: MessageBodyType): void => {
    if (open) {
      editMessageFunction?.({
        messageId: messageId,
        itemId: chatId,
        // todo: here we only send an update of the text and leave out the mention update
        body: body.body,
      });
    } else {
      sendMessageFunction?.({ itemId: chatId, ...body });
    }
    // reset editing
    cancelEdit();
  };

  return (
    <FullWidthWrapper>
      <EditBanner onClose={handleOnCloseEditingBanner} editedText={body} />
      <Input
        id={sendMessageBoxId}
        inputRef={inputRef}
        textInput={textInput}
        setTextInput={setTextInput}
        sendMessageFunction={handleSendMessageFunction}
      />
    </FullWidthWrapper>
  );
};

export default InputBar;
