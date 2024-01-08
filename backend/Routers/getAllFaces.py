import cv2
import os
import uuid
import sys


def getAllFace(img):
    face_cascade = cv2.CascadeClassifier(cv2.data.haarcascades + 'haarcascade_frontalface_default.xml')
    image = cv2.imread('../uploads/'+img)

    gray = cv2.cvtColor(image, cv2.COLOR_BGR2GRAY)

    face = face_cascade.detectMultiScale(gray, scaleFactor=1.1, minNeighbors=5, minSize=(30, 30))

    output_folder = '../extracted_faces'
    os.makedirs(output_folder, exist_ok=True)

    arr = []

    for i, (x,y,w,h) in enumerate(face):
        face = image[y:y + h, x:x+w]
        file_name = uuid.uuid4().hex
        face_filename = os.path.join(output_folder, f'{file_name}.jpg')
        cv2.imwrite(face_filename, face)
        arr.append(file_name)
    cv2.destroyAllWindows()
    print(arr)
getAllFace(sys.argv[2])
