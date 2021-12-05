import React, { useContext, useState } from "react";

import { useRecoilState } from "recoil";
import { useTheme } from "styled-components";
import { v4 as uuidv4 } from "uuid";

import { Button, FlexGrid, H2, Paragraph } from "../atoms";
import Input from "../Input";
import UserSessionContext from "~/contexts/UserSessionContext";
import { MediaType, notesState, Note } from "~/state/NotesAtom";

type Props = {
  mediaId: number;
  mediaType: MediaType;
};

const Notes: React.FC<Props> = ({ mediaType, mediaId }) => {
  const { userSessionData } = useContext(UserSessionContext);
  const [noteComment, setNoteComment] = useState<string>("");
  const [notes, setNotes] = useRecoilState(notesState);
  const theme = useTheme();

  const userId = userSessionData?.userInfo?.id;
  const userNotes = userId ? notes[userId] : [];
  const matchingNotes = (userNotes || []).filter(
    n => n.type === mediaType && n.mediaId === mediaId
  );

  const createNewNote = () => {
    if (!noteComment || !userId) return;

    const noteToSave: Note = {
      id: uuidv4(),
      mediaId,
      type: mediaType,
      note: noteComment
    };

    setNotes({
      [userId]: [...new Map([...(userNotes || []), noteToSave].map(v => [v.id, v])).values()]
    });
  };

  return (
    <FlexGrid flexDirection="column" gap="10px">
      <H2 margin="0px">Notes:</H2>
      {matchingNotes.map(n => (
        <FlexGrid
          key={n.id}
          border={`1px solid ${theme.secondaryBackgroundColor}`}
          borderRadius="5px"
          padding="5px">
          <Paragraph>{n.note}</Paragraph>
        </FlexGrid>
      ))}
      <FlexGrid gap="20px">
        <Input type="text" value={noteComment} onTextChange={setNoteComment} />
        <Button onClick={createNewNote}>Add note</Button>
      </FlexGrid>
    </FlexGrid>
  );
};

export default Notes;
